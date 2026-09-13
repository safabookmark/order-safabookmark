/* =========================================================
   SAFA Magnetic Bookmark
   V5 — harga Rp8.000 + Haramain Series + katalog + filter series + checkout
   ========================================================= */

/*
  CARA EDIT PRODUK NANTI:
  - series : nama kelompok produk
  - code   : kode desain
  - name   : nama desain
  - price  : harga dalam angka, tanpa titik
  - image  : nama file gambar dalam folder assets/products/

  Contoh gambar:
  assets/products/qr01.jpg
*/

const products = [
  // Qur'an Series
  { series: "Qur'an Series", code: "QR01", name: "Tilawah", price: 8000, image: "qr01.jpg" },
  { series: "Qur'an Series", code: "QR02", name: "Tasmi'", price: 8000, image: "qr02.jpg" },
  { series: "Qur'an Series", code: "QR03", name: "Muraja'ah", price: 8000, image: "qr03.jpg" },
  { series: "Qur'an Series", code: "QR04", name: "Hifzh", price: 8000, image: "qr04.jpg" },

  // Batik Series
  { series: "Batik Series", code: "BT01", name: "Jejak", price: 8000, image: "bt01.jpg" },
  { series: "Batik Series", code: "BT02", name: "Sekar", price: 8000, image: "bt02.jpg" },
  { series: "Batik Series", code: "BT03", name: "Kelopak", price: 8000, image: "bt03.jpg" },
  { series: "Batik Series", code: "BT04", name: "Alur", price: 8000, image: "bt04.jpg" },

  // Arabic Quotes Series
  { series: "Arabic Quotes Series", code: "AQ01", name: "Ilmu", price: 8000, image: "aq01.jpg" },
  { series: "Arabic Quotes Series", code: "AQ02", name: "Indah", price: 8000, image: "aq02.jpg" },
  { series: "Arabic Quotes Series", code: "AQ03", name: "Berkah", price: 8000, image: "aq03.jpg" },
  { series: "Arabic Quotes Series", code: "AQ04", name: "Tenang", price: 8000, image: "aq04.jpg" },

  // Kids Series
  { series: "Kids Series", code: "KD01", name: "Buah", price: 8000, image: "kd01.jpg" },
  { series: "Kids Series", code: "KD02", name: "Bakery", price: 8000, image: "kd02.jpg" },
  { series: "Kids Series", code: "KD03", name: "Rumah", price: 8000, image: "kd03.jpg" },
  { series: "Kids Series", code: "KD04", name: "Pelangi", price: 8000, image: "kd04.jpg" },

  // Playful Series
  { series: "Playful Series", code: "PF01", name: "Maize", price: 8000, image: "pf01.jpg" },
  { series: "Playful Series", code: "PF02", name: "Bee", price: 8000, image: "pf02.jpg" },
  { series: "Playful Series", code: "PF03", name: "Egg", price: 8000, image: "pf03.jpg" },
  { series: "Playful Series", code: "PF04", name: "Bloom", price: 8000, image: "pf04.jpg" },

  // Vintage Library Series
  { series: "Vintage Library Series", code: "VL01", name: "Pustaka", price: 8000, image: "vl01.jpg" },
  { series: "Vintage Library Series", code: "VL02", name: "Rehat", price: 8000, image: "vl02.jpg" },
  { series: "Vintage Library Series", code: "VL03", name: "Koleksi", price: 8000, image: "vl03.jpg" },
  { series: "Vintage Library Series", code: "VL04", name: "Arsip", price: 8000, image: "vl04.jpg" },

  // Haramain Series
  { series: "Haramain Series", code: "HR01", name: "Quba", price: 8000, image: "hr01.jpg" },
  { series: "Haramain Series", code: "HR02", name: "Makkah", price: 8000, image: "hr02.jpg" },
  { series: "Haramain Series", code: "HR03", name: "Sajadah", price: 8000, image: "hr03.jpg" },
  { series: "Haramain Series", code: "HR04", name: "Nabawi", price: 8000, image: "hr04.jpg" }
];

/*
  Quantity disimpan terpisah agar data produk tetap bersih.
  Nanti object ini juga dipakai keranjang + WhatsApp.
*/
const quantities = {};
products.forEach((product) => {
  quantities[product.code] = 0;
});

const catalogContainer = document.getElementById("catalogContainer");
const seriesFilter = document.getElementById("seriesFilter");

let activeSeries = "Semua";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function getSeriesList() {
  return [...new Set(products.map((product) => product.series))];
}

function getShortSeriesName(series) {
  return series.replace(" Series", "");
}

function renderFilters() {
  const filters = ["Semua", ...getSeriesList()];

  seriesFilter.innerHTML = filters
    .map((series) => {
      const label = series === "Semua" ? "Semua" : getShortSeriesName(series);
      const activeClass = series === activeSeries ? "active" : "";

      return `
        <button
          class="filter-btn ${activeClass}"
          type="button"
          data-series="${series}"
        >
          ${label}
        </button>
      `;
    })
    .join("");

  seriesFilter.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeSeries = button.dataset.series;
      renderFilters();
      renderCatalog();
    });
  });
}

function createProductCard(product) {
  const qty = quantities[product.code];
  const selectedClass = qty > 0 ? "is-selected" : "";

  const imageMarkup = product.image
    ? `
      <img
        class="product-image"
        src="assets/products/${product.image}"
        alt="${product.code} — ${product.name}"
      />
    `
    : `
      <div class="product-image-placeholder" aria-label="Gambar belum tersedia">
        ${product.code}<br />5:12
      </div>
    `;

  return `
    <article class="product-card ${selectedClass}" data-code="${product.code}">
      <div class="product-image-wrap">
        ${imageMarkup}
      </div>

      <div class="product-body">
        <p class="product-code">${product.code}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatRupiah(product.price)}</p>

        <div class="quantity-control" aria-label="Jumlah ${product.name}">
          <button
            class="qty-btn"
            type="button"
            data-action="minus"
            data-code="${product.code}"
            ${qty === 0 ? "disabled" : ""}
            aria-label="Kurangi ${product.name}"
          >
            −
          </button>

          <span class="qty-value">${qty}</span>

          <button
            class="qty-btn"
            type="button"
            data-action="plus"
            data-code="${product.code}"
            aria-label="Tambah ${product.name}"
          >
            +
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCatalog() {
  const visibleProducts =
    activeSeries === "Semua"
      ? products
      : products.filter((product) => product.series === activeSeries);

  const visibleSeries = [...new Set(visibleProducts.map((product) => product.series))];

  catalogContainer.innerHTML = visibleSeries
    .map((series) => {
      const seriesProducts = visibleProducts.filter(
        (product) => product.series === series
      );

      return `
        <section class="series-block">
          <h2 class="series-title">${series}</h2>

          <div class="product-grid">
            ${seriesProducts.map(createProductCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  bindQuantityButtons();
  bindImageFallbacks();
}

function bindImageFallbacks() {
  catalogContainer.querySelectorAll(".product-image").forEach((image) => {
    image.addEventListener("error", () => {
      const wrap = image.closest(".product-image-wrap");
      if (!wrap) return;

      const card = image.closest(".product-card");
      const code = card?.dataset.code || "";
      wrap.innerHTML = `
        <div class="product-image-placeholder" aria-label="Gambar belum tersedia">
          ${code}<br />gambar belum ditemukan
        </div>
      `;
    }, { once: true });
  });
}

function bindQuantityButtons() {
  catalogContainer.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.dataset.code;
      const action = button.dataset.action;

      if (action === "plus") {
        quantities[code] += 1;
      }

      if (action === "minus" && quantities[code] > 0) {
        quantities[code] -= 1;
      }

      renderCatalog();
      updateCart();
    });
  });
}

/* =========================================================
   Cart + customer form + WhatsApp
   ========================================================= */

const orderSummary = document.getElementById("orderSummary");
const totalItemsEl = document.getElementById("totalItems");
const totalPriceEl = document.getElementById("totalPrice");
const stickyCart = document.getElementById("stickyCart");
const stickyItems = document.getElementById("stickyItems");
const stickyPrice = document.getElementById("stickyPrice");
const viewOrderButton = document.getElementById("viewOrderButton");
const whatsappButton = document.getElementById("whatsappButton");
const customerName = document.getElementById("customerName");
const customerNote = document.getElementById("customerNote");
const nameError = document.getElementById("nameError");

const WHATSAPP_NUMBER = "6282325640565";
const MIN_ORDER = 1;

function getSelectedProducts() {
  return products
    .filter((product) => quantities[product.code] > 0)
    .map((product) => ({
      ...product,
      quantity: quantities[product.code]
    }));
}

function getCartTotals() {
  const selected = getSelectedProducts();

  return selected.reduce(
    (totals, product) => {
      totals.items += product.quantity;
      totals.price += product.price * product.quantity;
      return totals;
    },
    { items: 0, price: 0 }
  );
}

function updateCart() {
  const selected = getSelectedProducts();
  const totals = getCartTotals();

  if (selected.length === 0) {
    orderSummary.innerHTML = `
      <p class="empty-order">
        Belum ada bookmark yang dipilih. Pilih desain favoritmu di atas ✨
      </p>
    `;
  } else {
    orderSummary.innerHTML = selected
      .map(
        (product) => `
          <div class="summary-item">
            <div class="summary-item__name">
              <strong>${product.code} — ${product.name}</strong>
              <span>${product.quantity} × ${formatRupiah(product.price)}</span>
            </div>
            <span class="summary-item__price">
              ${formatRupiah(product.price * product.quantity)}
            </span>
          </div>
        `
      )
      .join("");
  }

  totalItemsEl.textContent = `${totals.items} pcs`;
  totalPriceEl.textContent = formatRupiah(totals.price);

  stickyItems.textContent = `${totals.items} pcs`;
  stickyPrice.textContent = formatRupiah(totals.price);

  const hasOrder = totals.items >= MIN_ORDER;
  stickyCart.hidden = !hasOrder;
  document.body.classList.toggle("has-sticky-cart", hasOrder);
  whatsappButton.disabled = !hasOrder;
}

viewOrderButton.addEventListener("click", () => {
  document.getElementById("orderSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

customerName.addEventListener("input", () => {
  if (customerName.value.trim()) {
    nameError.textContent = "";
  }
});

function createWhatsAppMessage() {
  const selected = getSelectedProducts();
  const totals = getCartTotals();
  const name = customerName.value.trim();
  const note = customerNote.value.trim();

  const orderLines = selected.map(
    (product) => `• ${product.code} — ${product.name} × ${product.quantity}`
  );

  const lines = [
    "Halo, saya mau pesan Magnetic Bookmark SAFA ✨",
    "",
    `Nama: ${name}`,
    "",
    "Pesanan:",
    ...orderLines,
    "",
    `Total pesanan: ${totals.items} pcs`,
    `Total harga: ${formatRupiah(totals.price)}`
  ];

  if (note) {
    lines.push("", "Catatan:", note);
  }

  lines.push("Terima kasih 🤍");
  lines.push("Jazakumullahu khairan");

  return lines.join("\n");
}

whatsappButton.addEventListener("click", () => {
  const totals = getCartTotals();

  if (totals.items < MIN_ORDER) {
    return;
  }

  if (!customerName.value.trim()) {
    nameError.textContent = "Nama belum diisi ya.";
    customerName.focus();
    customerName.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  nameError.textContent = "";

  const message = encodeURIComponent(createWhatsAppMessage());
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(whatsappUrl, "_blank");
});

/* Start */
renderFilters();
renderCatalog();
updateCart();

// =========================
// SHOWCASE SLIDER
// =========================

const showcaseSlider = document.getElementById("showcaseSlider");
const showcaseSlides = document.querySelectorAll(".showcase-slide");
const showcaseDots = document.getElementById("showcaseDots");

if (showcaseSlider && showcaseSlides.length && showcaseDots) {
  let activeShowcaseIndex = 0;

  showcaseSlides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "showcase-dot";
    dot.setAttribute("aria-label", `Lihat foto ${index + 1}`);

    dot.addEventListener("click", () => {
      showcaseSlides[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    });

    showcaseDots.appendChild(dot);
  });

  const dots = showcaseDots.querySelectorAll(".showcase-dot");

  function updateShowcaseDots(index) {
    activeShowcaseIndex = index;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  }

  updateShowcaseDots(0);

  showcaseSlider.addEventListener("scroll", () => {
    const sliderLeft = showcaseSlider.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    showcaseSlides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - sliderLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    updateShowcaseDots(closestIndex);
  });
}
