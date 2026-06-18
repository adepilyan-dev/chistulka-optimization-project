// Галерея работ
<Carousel className="w-full" autoplay opts={{ loop: true }}>
  <CarouselContent>
    {galleryItems.map((item) => (
      <CarouselItem key={item.id} className="basis-1/3">
        <div className="p-2">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={item.afterImg}
              alt={`Результат химчистки: ${item.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-semibold mt-2">{item.title}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
  <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
  <CarouselDots className="gap-3" />
</Carousel>

// Отзывы клиентов
<Carousel className="w-full max-w-4xl mx-auto" autoplay autoplayDelay={5000}>
  <CarouselContent>
    {reviews.map((review) => (
      <CarouselItem key={review.id}>
        <Card className="p-6 text-center">
          <CardHeader>
            <div className="flex justify-center text-yellow-400 text-xl">
              {"★".repeat(review.rating)}
            </div>
            <CardTitle>{review.name}</CardTitle>
            <CardDescription>{review.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{review.text}"</p>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselDots />
</Carousel>