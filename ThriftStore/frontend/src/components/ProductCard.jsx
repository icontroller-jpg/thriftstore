function ProductCard({ product }) {
  const buy = () => {
    const phone = "919999999999";
    const msg = `Hello, I would like to enquire about ${product.title} — $${product.price}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url);
  };

  return (
    <>
      <style>{`
        .pc {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--ivory, #f2ede4);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* ── Image wrapper ── */
        .pc-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #ece7de;
          flex-shrink: 0;
        }

        .pc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .pc:hover .pc-img-wrap img {
          transform: scale(1.04);
        }

        /* Sold out overlay */
        .pc-sold-overlay {
          position: absolute;
          inset: 0;
          background: rgba(242, 237, 228, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pc-sold-label {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--ink, #0e0d0b);
          border: 1px solid var(--ink, #0e0d0b);
          padding: 6px 14px;
        }

        /* ── Info block ── */
        .pc-info {
          padding: 16px 20px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .pc-title {
          font-family: 'IM Fell English', serif;
          font-size: 15px;
          font-weight: 400;
          color: var(--ink, #0e0d0b);
          line-height: 1.3;
          margin-bottom: 6px;
          /* Clamp to 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pc-price {
          font-family: 'Didact Gothic', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ink-50, rgba(14,13,11,0.5));
          margin-bottom: 0;
        }

        /* Spacer pushes button to bottom */
        .pc-spacer { flex: 1; }

        /* ── WhatsApp button ── */
        .pc-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 20px;
          margin-top: 20px;
          background: transparent;
          border: none;
          border-top: 1px solid var(--ink-10, rgba(14,13,11,0.1));
          cursor: pointer;
          font-family: 'Didact Gothic', sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-50, rgba(14,13,11,0.5));
          transition: color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .pc-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink, #0e0d0b);
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }

        .pc-btn:hover::after { transform: translateY(0); }

        .pc-btn:hover {
          color: var(--ivory, #f2ede4);
        }

        .pc-btn span,
        .pc-btn svg {
          position: relative;
          z-index: 1;
        }

        /* WhatsApp icon */
        .pc-wa-icon {
          width: 11px;
          height: 11px;
          flex-shrink: 0;
          transition: color 0.2s;
        }
      `}</style>

      <div className="pc">
        {/* Image */}
        <div className="pc-img-wrap">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
          {product.soldOut && (
            <div className="pc-sold-overlay">
              <span className="pc-sold-label">Sold</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pc-info">
          <h3 className="pc-title">{product.title}</h3>
          <p className="pc-price">${product.price}</p>
          <div className="pc-spacer" />
        </div>

        {/* WhatsApp CTA */}
        <button className="pc-btn" onClick={buy} aria-label={`Enquire about ${product.title}`}>
          <svg className="pc-wa-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </>
  );
}

export default ProductCard;