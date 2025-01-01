import React from "react"

const Carousel: React.FC = () => {
	return (
		<div className="carousel">
			{/* 簡單的輪播圖片 */}
			<img src="/images/banner1.jpg" alt="Banner 1" />
			<img src="/images/banner2.jpg" alt="Banner 2" />
		</div>
	)
}

export default Carousel
