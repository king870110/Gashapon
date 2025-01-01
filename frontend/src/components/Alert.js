import { useEffect } from "react"

function Alert({ message, type = "error", onClose, duration = 3000 }) {
	useEffect(() => {
		if (duration && onClose) {
			const timer = setTimeout(onClose, duration)
			return () => clearTimeout(timer)
		}
	}, [duration, onClose])

	const bgColor =
		type === "error"
			? "bg-red-50"
			: type === "success"
			? "bg-green-50"
			: "bg-blue-50"
	const textColor =
		type === "error"
			? "text-red-800"
			: type === "success"
			? "text-green-800"
			: "text-blue-800"
	const borderColor =
		type === "error"
			? "border-red-200"
			: type === "success"
			? "border-green-200"
			: "border-blue-200"

	return (
		<div
			className={`rounded-md ${bgColor} ${textColor} border ${borderColor} p-4 mb-4`}
		>
			<div className="flex">
				<div className="flex-shrink-0">
					{type === "error" ? (
						<svg
							className="h-5 w-5 text-red-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							className="h-5 w-5 text-green-400"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>
				<div className="ml-3">
					<p className="text-sm">{message}</p>
				</div>
				{onClose && (
					<div className="ml-auto pl-3">
						<button
							onClick={onClose}
							className="inline-flex text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">關閉</span>
							<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Alert
