import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { BLOG_POSTS } from "@/data/blog";
import { scrollToId, useInView } from "@/components/index/IndexShared";

export function Blog() {
  const { ref, inView } = useInView();
  return (
    <section id="blog" className="py-20" style={{ background: "var(--light-bg)" }}>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className={`section-tag ${inView ? "animate-fade-up" : "opacity-0"}`}>Блог</span>
            <h2 className={`font-oswald font-bold mt-3 ${inView ? "animate-fade-up stagger-1" : "opacity-0"}`} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--dark)" }}>
              Советы по чистоте
            </h2>
          </div>
          <button onClick={() => scrollToId("contacts")} className={`btn-primary px-6 py-2.5 text-sm font-oswald flex items-center gap-2 ${inView ? "animate-fade-up stagger-2" : "opacity-0"}`}>
            <Icon name="MessageCircle" size={16} />
            Задать вопрос
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className={`card-clean overflow-hidden cursor-pointer group block ${inView ? `animate-fade-up stagger-${i + 3}` : "opacity-0"}`}>
              <div className="h-40 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-tag text-xs">{post.tag}</span>
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.readTime} чтения</span>
                </div>
                <h3 className="font-oswald font-bold text-base leading-snug mb-3" style={{ color: "var(--dark)" }}>{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--gray)" }}>{post.date}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "var(--teal)" }}>
                    Читать <Icon name="ArrowRight" size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
