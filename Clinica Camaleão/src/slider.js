if (typeof $window === "undefined") {
  var $window = $(window); // Usa "var" e verifica se já foi declarada
}

const $body = $('body');

class Slideshow {
  constructor(userOptions = {}) {
    const defaultOptions = {
      $el: $('.slideshow'),
      showArrows: true,
      showPagination: true,
      autoplay: false, // Desativa autoplay
    };

    let options = Object.assign({}, defaultOptions, userOptions);

    this.$el = options.$el;
    this.maxSlide = this.$el.find('.js-slider-home-slide').length;
    this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
    this.showPagination = options.showPagination;
    this.currentSlide = 1;
    this.isAnimating = false;
    this.animationDuration = 1200;

    this.$controls = this.$el.find('.js-slider-home-button');

    $(document).on('click', '.js-slider-home-next', () => this.nextSlide());
    $(document).on('click', '.js-slider-home-prev', () => this.prevSlide());

    this.$el.on('click', '.js-pagination-item', (event) => {
      const targetSlide = $(event.target).data('slide');
      if (!this.isAnimating) {
        this.goToSlide(targetSlide);
      }
    });

    this.init();
  }

  init() {
    this.goToSlide(1); // Começa no primeiro slide
    if (this.showPagination) {
      this.createPagination();
    }
  }

  createPagination() {
    let paginationHTML = '<div class="pagination">';
    for (let i = 0; i < this.maxSlide; i++) {
      paginationHTML += `<span class="pagination__item js-pagination-item ${i === 0 ? 'is-current' : ''}" data-slide="${i + 1}"></span>`;
    }
    paginationHTML += '</div>';
    this.$el.append(paginationHTML);
  }

  goToSlide(index) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentSlide = index > this.maxSlide ? 1 : index < 1 ? this.maxSlide : index;

    this.$el.find('.js-slider-home-slide').removeClass('is-current is-prev is-next');
    this.$el.find('.js-pagination-item').removeClass('is-current');

    const newCurrent = this.$el.find(`.js-slider-home-slide[data-slide="${this.currentSlide}"]`);
    const newPrev = newCurrent.prev('.js-slider-home-slide').length ? newCurrent.prev() : this.$el.find('.js-slider-home-slide').last();
    const newNext = newCurrent.next('.js-slider-home-slide').length ? newCurrent.next() : this.$el.find('.js-slider-home-slide').first();

    newCurrent.addClass('is-current');
    newPrev.addClass('is-prev');
    newNext.addClass('is-next');
    this.$el.find(`.js-pagination-item[data-slide="${this.currentSlide}"]`).addClass('is-current');

    setTimeout(() => {
      this.isAnimating = false;
    }, this.animationDuration);
  }

  nextSlide() {
    this.goToSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentSlide - 1);
  }
}

// Inicializa o slider
$(document).ready(() => {
  const slideShow = new Slideshow({ showPagination: true });
});





(function() {
	let loaded = false;
	let maxLoad = 3000;  
  
	function load() {
		const options = {
      showPagination: true
    };

    let slideShow = new Slideshow(options);
	}
  
	function addLoadClass() {
		$body.addClass('is-loaded');

		setTimeout(function() {
			$body.addClass('is-animated');
		}, 600);
	}
  
	$window.on('load', function() {
		if(!loaded) {
			loaded = true;
			load();
		}
	});
  
	setTimeout(function() {
		if(!loaded) {
			loaded = true;
			load();
		}
	}, maxLoad);

	addLoadClass();
})();

$(document).ready(function() {
    const slideShow = new Slideshow({ showPagination: true });
});

$('body').css('overflow', 'auto');


$(document).ready(function () {
  console.log("Iniciando slider...");

  // Verifica se o slider está presente na página
  if ($(".slideshow").length > 0) {
      const slideShow = new Slideshow({ showPagination: true });

      // Delegação de eventos para os botões funcionarem após o carregamento dinâmico
      $(document).on('click', '.js-slider-home-next', function () {
          slideShow.nextSlide();
      });

      $(document).on('click', '.js-slider-home-prev', function () {
          slideShow.prevSlide();
      });

      console.log("Slider inicializado com sucesso!");
  } else {
      console.log("Slider não encontrado na página.");
  }
});

(function () {
  const $window = $(window); // Isso fica em um escopo privado

  class Slideshow {
      // Código da classe Slideshow aqui
  }

  // Inicialização do slider
  $(document).ready(function () {
      console.log("Iniciando slider...");
      if ($(".slideshow").length > 0) {
          const slideShow = new Slideshow({ showPagination: true });
          console.log("Slider inicializado com sucesso!");
      } else {
          console.log("Slider não encontrado na página.");
      }
  });
})();

