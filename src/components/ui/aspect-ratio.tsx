// В компоненте карточки работы
<AspectRatio ratio={4 / 3} className="rounded-2xl overflow-hidden group">
  <img
    src={work.afterImg}
    alt={`Результат химчистки: ${work.title}`}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    loading="lazy"
    decoding="async"
  />
  {work.badge && (
    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal text-white">
      {work.badge}
    </span>
  )}
</AspectRatio>;

// В галерее с разными размерами
const galleryItems = [
  { ratio: 16 / 9, img: "photo1.jpg" },
  { ratio: 4 / 3, img: "photo2.jpg" },
  { ratio: 1, img: "photo3.jpg" },
];

{
  galleryItems.map((item, i) => (
    <AspectRatio
      key={i}
      ratio={item.ratio}
      className="rounded-2xl overflow-hidden shadow-md"
    >
      <img
        src={item.img}
        alt={`Фото ${i + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </AspectRatio>
  ));
}
