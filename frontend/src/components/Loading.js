function Loading({ full = false }) {
	if (full) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		)
	}

	return (
		<div className="flex justify-center p-4">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
		</div>
	)
}

export default Loading
