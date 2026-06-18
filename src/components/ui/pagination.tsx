// ============================
// Пагинация для страницы работ
// ============================

export function WorksPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 5;
  const itemsPerPage = 6;

  // Получаем данные для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = works.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationPages
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxVisible={5}
          />

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-center text-sm text-muted-foreground">
        Показано {startIndex + 1}–{Math.min(endIndex, works.length)} из{" "}
        {works.length} работ
      </p>
    </div>
  );
}

// ============================
// Пагинация для отзывов
// ============================

export function ReviewsPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 3;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <Pagination>
        <PaginationContent className="flex-wrap gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                isActive={page === currentPage}
                className="min-w-[36px] text-sm"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
