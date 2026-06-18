// На странице услуги + района
<Breadcrumb className="mb-6">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="text-teal hover:text-teal-dark">
        Главная
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight className="h-3 w-3 text-gray-400" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/uslugi" className="text-teal hover:text-teal-dark">
        Услуги
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight className="h-3 w-3 text-gray-400" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink
        href="/uslugi/himchistka-divanov"
        className="text-teal hover:text-teal-dark"
      >
        Химчистка диванов
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <ChevronRight className="h-3 w-3 text-gray-400" />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage className="text-gray-600">
        Центральный округ
      </BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
