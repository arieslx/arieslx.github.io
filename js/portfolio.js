(function() {
  "use strict";

  var filters = document.querySelectorAll(".portfolio-filter");
  var cards = document.querySelectorAll(".portfolio-card");

  if (!filters.length || !cards.length) return;

  filters.forEach(function(filter) {
    filter.addEventListener("click", function() {
      var selectedCategory = filter.getAttribute("data-filter");

      filters.forEach(function(item) {
        var isSelected = item === filter;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-pressed", isSelected ? "true" : "false");
      });

      cards.forEach(function(card) {
        var isVisible = selectedCategory === "all" || card.getAttribute("data-category") === selectedCategory;
        card.hidden = !isVisible;
      });
    });
  });
})();
