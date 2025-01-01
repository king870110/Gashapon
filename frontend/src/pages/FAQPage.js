import { useState, useEffect } from "react"
import axios from "axios"

function FAQPage() {
	const [faqs, setFaqs] = useState({ categories: [], items: [] })
	const [loading, setLoading] = useState(true)
	const [activeCategory, setActiveCategory] = useState(null)

	useEffect(() => {
		const fetchFaqs = async () => {
			try {
				const response = await axios.get("/api/frontend/faq")
				setFaqs(response.data)
				if (response.data.categories.length > 0) {
					setActiveCategory(response.data.categories[0])
				}
				setLoading(false)
			} catch (error) {
				console.error("Error fetching FAQs:", error)
				setLoading(false)
			}
		}

		fetchFaqs()
	}, [])

	if (loading) return <div>Loading...</div>

	const filteredItems = activeCategory
		? faqs.items.filter((item) => item.category === activeCategory)
		: faqs.items

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">常見問題</h1>

			{/* 分類標籤 */}
			<div className="mb-8">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						{faqs.categories.map((category) => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`
									whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
									${
										activeCategory === category
											? "border-indigo-500 text-indigo-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}
								`}
							>
								{category}
							</button>
						))}
					</nav>
				</div>
			</div>

			{/* FAQ 列表 */}
			<div className="space-y-6">
				{filteredItems.map((item) => (
					<div key={item.question} className="bg-white shadow rounded-lg p-6">
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							{item.question}
						</h3>
						<p className="text-gray-500">{item.answer}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default FAQPage
