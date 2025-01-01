import React from "react"
import Carousel from "../components/Carousel"

const HomePage: React.FC = () => {
	return (
		<div className="home-page">
			<Carousel />
			<div className="activities">
				<h2>活動圖片</h2>
				{/* 添加活動圖片 */}
				<img src="/images/activity1.jpg" alt="Activity 1" />
				<img src="/images/activity2.jpg" alt="Activity 2" />
			</div>
		</div>
	)
}

export default HomePage
