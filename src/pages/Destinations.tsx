 <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="text-amber-600 mr-3">⭐</span>
              Customer Reviews & Ratings
            </h3>
            <div className="flex items-center bg-amber-100 px-6 py-3 rounded-full shadow-sm">
              <Star className="h-6 w-6 fill-amber-500 text-amber-500 mr-2" />
              <span className="font-bold text-2xl text-amber-700">{safeRating}</span>
              <span className="text-amber-600 ml-2 font-medium">({safeRatingCount} reviews)</span>
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="mb-8 bg-white/60 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-4">Rating Breakdown</h4>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "8%" : rating === 2 ? "2%" : "0%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
            >
              {showReviewForm ? "Cancel Review" : "✍️ Write a Review"}
            </Button>
          </div>

          {showReviewForm && (
            <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <span className="text-blue-600 mr-3">💭</span>
                  Share Your Experience
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Your Name</label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                          className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= newReview.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-4 text-lg font-medium text-gray-700 bg-white/60 px-3 py-1 rounded-full">
                        {newReview.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      rows={5}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Share your experience with this tour..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={submitReview}
                      disabled={submittingReview || !newReview.name.trim() || !newReview.comment.trim()}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 font-medium shadow-lg"
                    >
                      {submittingReview ? "Submitting..." : "🚀 Submit Review"}
                    </Button>
                    <Button
                      onClick={() => setShowReviewForm(false)}
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {safeReviews.map((review, index) => (
              <div
                key={review._id || index}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{review.name}</div>
                      {review.createdAt && (
                        <div className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 font-bold text-amber-700">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>