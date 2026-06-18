import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ============================================================
// БАЗОВЫЙ КОМПОНЕНТ CAROUSEL
// ============================================================

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => api?.off("select", onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Предыдущий слайд</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Следующий слайд</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// ============================================================
// РАСШИРЕННЫЙ КОМПОНЕНТ С МИКРОРАЗМЕТКОЙ
// ============================================================

interface CarouselWithSchemaProps extends CarouselProps {
  /** Название карусели (для микроразметки) */
  name?: string;
  /** Описание карусели (для микроразметки) */
  description?: string;
  /** Тип элементов в карусели */
  itemType?: "Service" | "Product" | "Review" | "Article" | "ImageObject";
  /** Массив элементов (для микроразметки) */
  items?: Array<{
    name: string;
    description?: string;
    image?: string;
    url?: string;
    price?: number;
    rating?: number;
    datePublished?: string;
  }>;
  /** Дополнительные классы */
  className?: string;
  children?: React.ReactNode;
}

/**
 * Компонент Carousel с микроразметкой ItemList
 * Используйте для каруселей с отзывами, работами, услугами.
 */
export function CarouselWithSchema({
  name = "Карусель",
  description,
  itemType = "Service",
  items = [],
  className,
  children,
  ...props
}: CarouselWithSchemaProps) {
  // Формируем микроразметку ItemList для карусели
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    ...(description && { description: description }),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": itemType,
        name: item.name,
        ...(item.description && { description: item.description }),
        ...(item.image && { image: item.image }),
        ...(item.url && { url: item.url }),
        ...(item.price !== undefined && {
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "RUB",
          },
        }),
        ...(item.rating !== undefined && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: item.rating,
          },
        }),
        ...(item.datePublished && { datePublished: item.datePublished }),
      },
    })),
  };

  return (
    <>
      {/* Микроразметка карусели */}
      {items.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(itemListLd)}
          </script>
        </Helmet>
      )}

      {/* Визуальная карусель */}
      <Carousel className={cn("relative", className)} {...props}>
        {children}
      </Carousel>
    </>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ КАРУСЕЛИ ОТЗЫВОВ
// ============================================================

interface ReviewsCarouselProps {
  /** Массив отзывов */
  reviews: Array<{
    author: string;
    text: string;
    rating: number;
    role?: string;
  }>;
  /** Дополнительные классы */
  className?: string;
  /** Дочерние элементы (слайды с отзывами) */
  children: React.ReactNode;
}

/**
 * Карусель отзывов с микроразметкой ItemList
 */
export function ReviewsCarousel({
  reviews,
  className,
  children,
}: ReviewsCarouselProps) {
  const items = reviews.map((review) => ({
    name: `Отзыв от ${review.author}`,
    description: review.text,
    rating: review.rating,
  }));

  return (
    <CarouselWithSchema
      name="Отзывы клиентов"
      description="Реальные отзывы о нашей работе"
      itemType="Review"
      items={items}
      className={className}
      opts={{ loop: true, align: "start" }}
    >
      {children}
    </CarouselWithSchema>
  );
}

// ============================================================
// ПРЕДНАСТРОЕННЫЙ КОМПОНЕНТ ДЛЯ КАРУСЕЛИ РАБОТ
// ============================================================

interface GalleryCarouselProps {
  /** Массив работ */
  works: Array<{
    title: string;
    image: string;
    description?: string;
  }>;
  /** Дополнительные классы */
  className?: string;
  /** Дочерние элементы (слайды с работами) */
  children: React.ReactNode;
}

/**
 * Карусель работ с микроразметкой ItemList
 */
export function GalleryCarousel({
  works,
  className,
  children,
}: GalleryCarouselProps) {
  const items = works.map((work) => ({
    name: work.title,
    description: work.description || work.title,
    image: work.image,
  }));

  return (
    <CarouselWithSchema
      name="Наши работы"
      description="Реальные примеры химчистки до и после"
      itemType="ImageObject"
      items={items}
      className={className}
      opts={{ loop: true, align: "start" }}
    >
      {children}
    </CarouselWithSchema>
  );
}

// ============================================================
// ЭКСПОРТ СТАНДАРТНЫХ КОМПОНЕНТОВ
// ============================================================

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
