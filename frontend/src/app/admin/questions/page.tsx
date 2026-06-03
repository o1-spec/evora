'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { toast } from '@/components/admin/Toast';
import { Plus, Edit2, Trash2, Search, Eye, X, HelpCircle, ChevronDown, Upload } from 'lucide-react';

async function fetchQuestions(page: number, search: string, examId: string) {
  const params = new URLSearchParams({ page: String(page), limit: '25' });
  if (examId) params.set('examId', examId);
  if (search) params.set('search', search);
  const { data } = await api.get(`/admin/questions?${params}`);
  return data.data;
}

async function fetchExams() {
  const { data } = await api.get('/admin/exams?limit=100');
  return data.data;
}

function parseCSV(text: string) {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine);
      currentLine = '';
    } else if (char === '\r' && !inQuotes) {
      // skip CR
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length === 0) return [];

  const splitLine = (line: string) => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const headers = splitLine(lines[0]).map(h => h.trim().toLowerCase());
  const questions: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = splitLine(lines[i]);
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });

    if (row.text) {
      let parsedOptions: string[] = [];
      const optsRaw = row.options || '';
      if (optsRaw.startsWith('[') && optsRaw.endsWith(']')) {
        try {
          parsedOptions = JSON.parse(optsRaw);
        } catch {
          parsedOptions = optsRaw.split('|').map((o: string) => o.trim());
        }
      } else if (optsRaw) {
        parsedOptions = optsRaw.split('|').map((o: string) => o.trim());
      }

      questions.push({
        text: row.text,
        options: parsedOptions,
        correctKey: row.correctkey || row.correct_key || row.correctKey || '',
        audioUrl: row.audiourl || row.audio_url || row.audioUrl || '',
        imageUrl: row.imageurl || row.image_url || row.imageUrl || '',
        maxScore: Number(row.maxscore || row.max_score || row.maxScore) || 1,
        orderIndex: Number(row.orderindex || row.order_index || row.orderIndex) || (i - 1),
      });
    }
  }
  return questions;
}

export default function AdminQuestionsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [examId, setExamId] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const emptyForm = { sectionId: '', text: '', options: '[]', correctKey: '', audioUrl: '', maxScore: 1, orderIndex: 0 };
  const [form, setForm] = useState(emptyForm);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState('');

  // Bulk import states
  const [importOpen, setImportOpen] = useState(false);
  const [importExamId, setImportExamId] = useState('');
  const [importSectionId, setImportSectionId] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState<any[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-questions', page, examId, search],
    queryFn: () => fetchQuestions(page, search, examId),
  });

  const { data: examsData } = useQuery({
    queryKey: ['admin-exams-list'],
    queryFn: fetchExams,
  });

  const { data: selectedExamData, isLoading: isSectionsLoading } = useQuery({
    queryKey: ['admin-exam-details', selectedExamId],
    queryFn: async () => {
      if (!selectedExamId) return null;
      const { data } = await api.get(`/admin/exams/${selectedExamId}`);
      return data.data.exam;
    },
    enabled: !!selectedExamId,
  });

  const { data: importExamData, isLoading: isImportSectionsLoading } = useQuery({
    queryKey: ['admin-exam-details-import', importExamId],
    queryFn: async () => {
      if (!importExamId) return null;
      const { data } = await api.get(`/admin/exams/${importExamId}`);
      return data.data.exam;
    },
    enabled: !!importExamId,
  });

  const handleOptionsChange = (val: string) => {
    setForm(f => ({ ...f, options: val }));
    if (!val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        setJsonError('Options must be a valid JSON array (e.g. ["A", "B"])');
      } else if (parsed.some(o => typeof o !== 'string')) {
        setJsonError('All options must be strings');
      } else {
        setJsonError(null);
      }
    } catch (e: any) {
      setJsonError(`Invalid JSON syntax: ${e.message}`);
    }
  };

  const handleCloseImport = () => {
    setImportOpen(false);
    setImportExamId('');
    setImportSectionId('');
    setFileName('');
    setParsedQuestions([]);
    setParseError(null);
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setParseError(null);
    setParsedQuestions([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        setParseError('Failed to read file content.');
        return;
      }

      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(text);
          if (!Array.isArray(parsed)) {
            setParseError('JSON structure must be an array of questions.');
            return;
          }
          if (parsed.length === 0) {
            setParseError('JSON array is empty.');
            return;
          }
          
          const validated = parsed.map((q: any, i) => {
            let opts: string[] = [];
            if (Array.isArray(q.options)) {
              opts = q.options.map((o: any) => String(o));
            } else if (typeof q.options === 'string') {
              try {
                opts = JSON.parse(q.options);
              } catch {
                opts = q.options.split('|').map((o: any) => String(o).trim());
              }
            }
            return {
              text: q.text || `Question ${i + 1}`,
              options: opts,
              correctKey: q.correctKey || q.correct_key || '',
              audioUrl: q.audioUrl || q.audio_url || '',
              imageUrl: q.imageUrl || q.image_url || '',
              maxScore: Number(q.maxScore || q.max_score) || 1,
              orderIndex: Number(q.orderIndex || q.order_index) || i,
            };
          });

          setParsedQuestions(validated);
        } catch (err: any) {
          setParseError(`Failed to parse JSON: ${err.message}`);
        }
      } else if (file.name.endsWith('.csv')) {
        try {
          const questions = parseCSV(text);
          if (questions.length === 0) {
            setParseError('No valid questions parsed from CSV. Check headers (text, options, correctKey).');
            return;
          }
          setParsedQuestions(questions);
        } catch (err: any) {
          setParseError(`Failed to parse CSV: ${err.message}`);
        }
      } else {
        setParseError('Unsupported file type. Use .json or .csv');
      }
    };
    reader.onerror = () => {
      setParseError('Error reading file.');
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/questions/${id}`),
    onSuccess: () => { toast.success('Question deleted.'); queryClient.invalidateQueries({ queryKey: ['admin-questions'] }); setDeleteTarget(null); },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed.'),
  });

  const saveMutation = useMutation({
    mutationFn: (payload: any) => {
      let parsedOptions = [];
      try {
        parsedOptions = JSON.parse(payload.options || '[]');
      } catch (err) {
        parsedOptions = [];
      }
      const formattedPayload = { ...payload, options: parsedOptions };
      return editTarget
        ? api.patch(`/admin/questions/${editTarget.id}`, formattedPayload)
        : api.post('/admin/questions', formattedPayload);
    },
    onSuccess: () => {
      toast.success(editTarget ? 'Question updated.' : 'Question created.');
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      setFormOpen(false); setEditTarget(null); setForm(emptyForm); setJsonError(null);
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed.'),
  });

  const importMutation = useMutation({
    mutationFn: (payload: { sectionId: string; questions: any[] }) =>
      api.post('/admin/questions/import', payload),
    onSuccess: (res: any) => {
      toast.success(res?.data?.data?.message || 'Questions imported successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      handleCloseImport();
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to import questions.'),
  });

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Questions</h1>
          <p className="admin-page-subtitle">Manage all TCF exam questions</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setImportOpen(true)}>
            <Upload size={16} /> Bulk Import
          </button>
          <button className="admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => { setSelectedExamId(''); setFormOpen(true); setEditTarget(null); setForm(emptyForm); setJsonError(null); }}>
            <Plus size={16} /> New Question
          </button>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input type="text" placeholder="Search questions…" className="admin-search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ position: 'relative', minWidth: 180 }}>
          <select
            className="admin-select"
            style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
            value={examId}
            onChange={(e) => { setExamId(e.target.value); setPage(1); }}
          >
            <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>All Exams</option>
            {examsData?.exams?.map((e: any) => (
              <option key={e.id} value={e.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                {e.title}
              </option>
            ))}
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
        </div>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Exam</th>
                <th>Section</th>
                <th>Correct Key</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => <tr key={i}>{[...Array(6)].map((_, j) => <td key={j}><div className="skeleton" style={{ height: 16 }} /></td>)}</tr>)
              ) : data?.questions?.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>No questions found.</td></tr>
              ) : data?.questions?.map((q: any) => (
                <tr key={q.id}>
                  <td className="admin-table-num">{q.orderIndex + 1}</td>
                  <td>
                    <div className="admin-table-primary" style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.text}
                    </div>
                    {q.audioUrl && <div className="admin-table-secondary">🔊 Audio</div>}
                  </td>
                  <td className="admin-table-secondary">{q.section?.exam?.title || '—'}</td>
                  <td><AdminBadge value={q.section?.type || '—'} variant="section" /></td>
                  <td className="admin-table-secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>{q.correctKey || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn-icon" title="Preview" onClick={() => setPreview(q)}><Eye size={13} /></button>
                      <button className="admin-btn-icon" title="Edit" onClick={() => {
                        setEditTarget(q);
                        setSelectedExamId(q.section?.exam?.id || '');
                        setForm({
                          sectionId: q.sectionId,
                          text: q.text,
                          options: JSON.stringify(q.options || []),
                          correctKey: q.correctKey || '',
                          audioUrl: q.audioUrl || '',
                          maxScore: q.maxScore,
                          orderIndex: q.orderIndex
                        });
                        setJsonError(null);
                        setFormOpen(true);
                      }}><Edit2 size={13} /></button>
                      <button className="admin-btn-icon danger" title="Delete" onClick={() => setDeleteTarget({ id: q.id })}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data?.pagination && <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><AdminPagination page={data.pagination.page} pages={data.pagination.pages} total={data.pagination.total} onPageChange={setPage} /></div>}
      </div>

      {/* Create / Edit Modal */}
      {formOpen && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => { setFormOpen(false); setEditTarget(null); }}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 460 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <HelpCircle size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => { setFormOpen(false); setEditTarget(null); }}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">{editTarget ? 'Edit Question' : 'New Question'}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <div className="admin-form-group">
                <label className="admin-label">Exam</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="admin-select"
                    style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
                    value={selectedExamId}
                    onChange={(e) => {
                      setSelectedExamId(e.target.value);
                      setForm(f => ({ ...f, sectionId: '' }));
                    }}
                  >
                    <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>Select Exam</option>
                    {examsData?.exams?.map((e: any) => (
                      <option key={e.id} value={e.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Section</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="admin-select"
                    style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
                    value={form.sectionId}
                    disabled={!selectedExamId || isSectionsLoading}
                    onChange={(e) => setForm(f => ({ ...f, sectionId: e.target.value }))}
                  >
                    <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>
                      {isSectionsLoading ? 'Loading...' : 'Select Section'}
                    </option>
                    {selectedExamData?.sections?.map((s: any) => (
                      <option key={s.id} value={s.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                        {s.type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                </div>
              </div>
            </div>

            <div className="admin-form-group" style={{ marginTop: 12 }}>
              <label className="admin-label">Question Text</label>
              <textarea className="admin-textarea" style={{ width: '100%' }} rows={3} value={form.text} onChange={(e) => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Enter question text…" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Options (JSON array)</label>
              <textarea className="admin-textarea" style={{ width: '100%', fontFamily: 'monospace', fontSize: 12, borderColor: jsonError ? '#ef4444' : '' }} rows={2} value={form.options} onChange={(e) => handleOptionsChange(e.target.value)} placeholder='["Option A", "Option B", "Option C", "Option D"]' />
              {jsonError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>{jsonError}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Correct Key</label>
                <input className="admin-input" style={{ width: '100%' }} value={form.correctKey} onChange={(e) => setForm(f => ({ ...f, correctKey: e.target.value }))} placeholder="A / exact text" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Max Score</label>
                <input type="number" className="admin-input" style={{ width: '100%' }} value={form.maxScore} onChange={(e) => setForm(f => ({ ...f, maxScore: Number(e.target.value) }))} />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Audio URL (optional)</label>
              <input className="admin-input" style={{ width: '100%' }} value={form.audioUrl} onChange={(e) => setForm(f => ({ ...f, audioUrl: e.target.value }))} placeholder="https://…" />
            </div>
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={() => { setFormOpen(false); setEditTarget(null); }}>Cancel</button>
              <button className="admin-btn-primary" disabled={saveMutation.isPending || !!jsonError || !form.sectionId} onClick={() => saveMutation.mutate(form)}>
                {saveMutation.isPending ? 'Saving…' : (editTarget ? 'Save Changes' : 'Create')}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* Import Modal */}
      {importOpen && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={handleCloseImport}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 500 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Upload size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={handleCloseImport}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Bulk Import Questions</h3>
            <p className="admin-modal-message">
              Upload TCF prep questions in CSV or JSON format.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <div className="admin-form-group">
                <label className="admin-label">Target Exam</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="admin-select"
                    style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
                    value={importExamId}
                    onChange={(e) => {
                      setImportExamId(e.target.value);
                      setImportSectionId('');
                      setParsedQuestions([]);
                      setParseError(null);
                    }}
                  >
                    <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>Select Exam</option>
                    {examsData?.exams?.map((e: any) => (
                      <option key={e.id} value={e.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Target Section</label>
                <div style={{ position: 'relative' }}>
                  <select
                    className="admin-select"
                    style={{ width: '100%', paddingRight: 36, appearance: 'none', WebkitAppearance: 'none' }}
                    value={importSectionId}
                    disabled={!importExamId || isImportSectionsLoading}
                    onChange={(e) => {
                      setImportSectionId(e.target.value);
                    }}
                  >
                    <option value="" style={{ background: '#111827', color: '#f1f5f9' }}>
                      {isImportSectionsLoading ? 'Loading...' : 'Select Section'}
                    </option>
                    {importExamData?.sections?.map((s: any) => (
                      <option key={s.id} value={s.id} style={{ background: '#111827', color: '#f1f5f9' }}>
                        {s.type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                </div>
              </div>
            </div>

            <div
              className={`import-dropzone ${dragOver ? 'dragover' : ''}`}
              style={{
                marginTop: 16,
                border: '2px dashed rgba(255, 255, 255, 0.15)',
                borderRadius: 12,
                padding: '24px 16px',
                textAlign: 'center',
                background: dragOver ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('import-file-input')?.click()}
            >
              <input
                id="import-file-input"
                type="file"
                accept=".csv,.json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Upload size={28} style={{ color: '#8b5cf6', margin: '0 auto 12px' }} />
              <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500 }}>
                {fileName ? fileName : 'Click to select or drag CSV / JSON file'}
              </p>
              <p style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>
                Supports UTF-8 CSV or JSON formats
              </p>
            </div>

            {parseError && (
              <div style={{ marginTop: 12, color: '#ef4444', fontSize: 13, background: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: 8 }}>
                {parseError}
              </div>
            )}

            {parsedQuestions.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
                  <span>Parsed <strong>{parsedQuestions.length}</strong> questions</span>
                  <span style={{ color: '#22c55e' }}>Ready to import</span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12, border: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                  <div style={{ color: '#64748b', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Preview First Question:</div>
                  <div style={{ color: '#f1f5f9', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {parsedQuestions[0].text}
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {parsedQuestions[0].options?.map((opt: string, i: number) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#94a3b8' }}>
                        {opt}
                      </span>
                    ))}
                  </div>
                  {parsedQuestions[0].correctKey && (
                    <div style={{ marginTop: 6, fontSize: 11, color: '#22c55e' }}>
                      Correct: {parsedQuestions[0].correctKey}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" onClick={handleCloseImport} disabled={importMutation.isPending}>
                Cancel
              </button>
              <button
                className="admin-btn-primary"
                disabled={importMutation.isPending || !importSectionId || parsedQuestions.length === 0}
                onClick={() => importMutation.mutate({ sectionId: importSectionId, questions: parsedQuestions })}
              >
                {importMutation.isPending ? 'Importing…' : 'Import Now'}
              </button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      {/* Preview Modal */}
      {preview && typeof window !== 'undefined' && createPortal(
        <dialog open className="admin-modal" onClose={() => setPreview(null)}>
          <div className="admin-modal-content" style={{ width: '100%', maxWidth: 420 }}>
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                <Eye size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <button className="admin-modal-close" onClick={() => setPreview(null)}>
                <X size={18} />
              </button>
            </div>
            <h3 className="admin-modal-title">Question Preview</h3>
            <div style={{ background: '#0f1729', borderRadius: 12, padding: '20px', marginTop: 16 }}>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{preview.text}</p>
              {preview.audioUrl && <audio controls src={preview.audioUrl} style={{ marginTop: 12, width: '100%' }} />}
              {preview.options && Array.isArray(preview.options) && (
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {preview.options.map((opt: string, i: number) => (
                    <div key={i} style={{
                      padding: '10px 16px', borderRadius: 8,
                      background: opt === preview.correctKey ? '#1a3a2a' : '#1a2035',
                      border: `1px solid ${opt === preview.correctKey ? '#22c55e44' : 'rgba(255,255,255,0.07)'}`,
                      color: opt === preview.correctKey ? '#86efac' : '#94a3b8', fontSize: 14,
                    }}>
                      {opt === preview.correctKey ? '✓ ' : ''}{opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="admin-modal-actions" style={{ marginTop: 24 }}>
              <button className="admin-btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setPreview(null)}>Close</button>
            </div>
          </div>
        </dialog>,
        document.body
      )}

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Question" message="Permanently delete this question?" confirmLabel="Delete" variant="danger" loading={deleteMutation.isPending} onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
