$(function () {
	
	// 變數
	var $container = $('.slides-show'),					// 幻燈片容器
			$slides = $container.find('.slides'),		// 幻燈片圖片
			$nav = $container.find('.slide-nav'),		// 上一張、下一張按鈕
			$indicator = $('.indicator'),						// 下方圓點

			slideCount = $slides.length,						// 圖片張數
			currentIndex = 0,												// 目前圖片引數, 初始第一張
			timer;																	// 計時器 ID

	// 切換到指定圖片
	function goToSlide(index) {
		// 上一張圖片消失
		// 不是目前引數的圖片隱藏
		$slides.not($slides.eq(index)).fadeOut(50);

		// 顯示目前引數
		$slides.eq(index).fadeIn('slow');

		// 更新目前引數
		currentIndex = index;

		updateIndicator();
	}

	$container.each(function() {

		// 手動切換圖片事件
		$nav.on('click', 'a', function(event) {
			event.preventDefault();
			
			// 斷判上一張按鈕
			if ($(this).hasClass('prev')) {
				goToSlide((currentIndex - 1) % slideCount)
			} else {
				goToSlide((currentIndex + 1) % slideCount);
			}
		});


		// 開始計時器
		// 固定時間切換到下一張圖片
		function startTimer() {
			timer = setInterval(function () {
				var nextIndex = (currentIndex + 1) % slideCount;
				goToSlide(nextIndex);
			}, 3000);
		}

		// 停止計時器
		function stopTimer() {
			clearInterval(timer);
		}

		// 幻燈片監聽事件
		$(this).on({
			mouseenter: stopTimer,
			mouseleave: startTimer
		});

		goToSlide(currentIndex);
		startTimer();

	});

	// 更新圓點狀態
	function updateIndicator() {
		$indicator.find('.dot').removeClass('active')
			.eq(currentIndex).addClass('active');
	}

	// 下方圓點點擊事件
	$indicator.on('click', '.dot', function(event) {
		event.preventDefault();

		// 切換到圓點對應的圖片
		goToSlide($(this).index());
	});
});