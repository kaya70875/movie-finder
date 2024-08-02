import React from 'react';
import './Pagination.css';

export default function Pagination({ currentPage, setCurrentPage, results }) {
  const totalPages = results.total_pages;
  const pageList = [];
  const pageWindow = 5;

  const startPage = Math.max(2, currentPage - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages - 1, currentPage + Math.floor(pageWindow / 2));

  if (currentPage > 1) {
    pageList.push(1);
  }

  if (startPage > 2) {
    pageList.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pageList.push(i);
  }

  if (endPage < totalPages - 1) {
    pageList.push('...');
  }

  if (currentPage < totalPages) {
    pageList.push(totalPages);
  }

  return (
    <div className="pagination">
      <div className="pagination__section">
        {pageList.map((page, i) =>
          page === '...' ? (
            <span key={i} className="pagination__ellipsis">
              {page}
            </span>
          ) : (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
              className={`pag-button ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
