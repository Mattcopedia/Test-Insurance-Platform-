import { Button, cn } from '@wrapa/ui'

interface NewsPaginationProps {
  currentPage?: number
  totalPages?: number
  className?: string
}

export function NewsPagination({
  currentPage = 1,
  totalPages = 4,
  className,
}: NewsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={cn('flex items-center justify-center gap-2 sm:gap-3', className)}>
      <Button
        variant="outline"
        size="sm"
        fullWidth={false}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" stroke="currentColor" />
        </svg>
        <span className="hidden sm:inline ml-1">Previous</span>
      </Button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={cn(
              'w-9 h-9 rounded-full text-[14px] font-medium transition-colors duration-150 border',
              page === currentPage
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/60 border-black/20 hover:border-black/50 hover:text-black'
            )}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        fullWidth={false}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline mr-1">Next</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" stroke="currentColor" />
        </svg>
      </Button>
    </div>
  )
}
