import React from 'react'
import { Button } from "@/components/ui/button";
const Footer = () => {
  return (
    <>
    
     {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Karvaan Tours
              </h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner for unforgettable Japanese adventures and cultural experiences.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">Facebook</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">Instagram</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">Twitter</Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Guide</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                {/* <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a> */}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Reviews</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@carwantours.com</p>
                <p>📞 +81-3-1234-5678</p>
                <p>📍 Tokyo, Japan</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Karvaan Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer