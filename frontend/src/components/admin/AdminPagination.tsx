'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function AdminPagination({ page, pages, total, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;

  const range: (number | '...')[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - 1 && i <= page + 1)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }

  return (
    <div className="admin-pagination">
      <span className="admin-pagination-info">
        {total.toLocaleString()} total
      </span>
      <div className="admin-pagination-controls">
        <button
          className="admin-pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        {range.map((r, i) =>
          r === '...' ? (
            <span key={`ellipsis-${i}`} className="admin-pagination-ellipsis">…</span>
          ) : (
            <button
              key={r}
              className={`admin-pagination-btn ${r === page ? 'active' : ''}`}
              onClick={() => onPageChange(r as number)}
            >
              {r}
            </button>
          )
        )}
        <button
          className="admin-pagination-btn"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
