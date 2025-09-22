<section id="languages" className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="outline" className="mb-4">🌐 MULTILINGUAL SUPPORT</Badge>
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">Guides Available in Multiple Languages</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our professional guides speak your language for the best experience</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {[
//               { lang: "English", flag: "🇺🇸", level: "Native" },
//               { lang: "Japanese", flag: "🇯🇵", level: "Native" },
//               { lang: "Chinese", flag: "🇨🇳", level: "Fluent" },
//               { lang: "Korean", flag: "🇰🇷", level: "Fluent" },
//               { lang: "Urdu", flag: "🇵🇰", level: "Fluent" },
//             ].map((language) => (
//               <Card key={language.lang} className="text-center p-6 hover:shadow-lg transition-shadow">
//                 <div className="text-4xl mb-3">{language.flag}</div>
//                 <h3 className="font-semibold mb-1">{language.lang}</h3>
//                 <Badge variant="secondary" className="text-xs">{language.level}</Badge>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
 <div className="text-center mt-10">
//             <Link to="/blog">
//               <Button variant="ghost" className="underline underline-offset-4">View all destinations</Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Top Tours (short-forms) */}
//       <section id="tours" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Tours</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied travelers on our most beloved Japanese adventures</p>
//           </div>

//           {loadingTop ? (
//             <GridSkeleton rows={3} />
//           ) : topTours.length === 0 ? (
//             <EmptyState label="No tours found. Please create some short-form tours in the admin panel." />
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {topTours.map((t, idx) => (
//                 <Card key={t.id ?? `t-${idx}`} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
//                   <div className="relative">
//                     {t.image ? (
//                       <img src={t.image} alt={t.title} loading="lazy" className="w-full h-48 object-cover" />
//                     ) : (
//                       <div className="w-full h-48 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
//                         <Star className="h-12 w-12 text-gray-400" />
//                       </div>
//                     )}
//                     <div className="absolute top-4 left-4"><Badge className="bg-red-500 text-white">Best Seller</Badge></div>
//                     <div className="absolute top-4 right-4">
//                       <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">{t.price}</div>
//                     </div>
//                   </div>
//                   <CardContent className="p-6">
//                     <h3 className="text-xl font-bold mb-2">{t.title}</h3>
//                     <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//                       <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {t.duration}</div>
//                       <div className="flex items-center"><Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /> {t.rating} ({t.reviews})</div>
//                     </div>

//                     <div className="mb-4">
//                       <h4 className="font-semibold mb-2">Languages Available:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {(t.languages || []).map((lang, i) => (
//                           <Badge key={i} variant="outline" className="text-xs">{lang}</Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <h4 className="font-semibold mb-2">Includes:</h4>
//                       <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
//                         {(t.includes || []).map((item, i) => (
//                           <div key={i} className="flex items-center"><div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />{item}</div>
//                         ))}
//                       </div>
//                     </div>

//                     {t.id ? (
//                       <Link to={`/short-form/${t.id}`}>
//                         <Button className="w-full bg-blue-600 hover:bg-blue-700">Book This Tour</Button>
//                       </Link>
//                     ) : (
//                       <Button className="w-full" disabled>Book This Tour</Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
