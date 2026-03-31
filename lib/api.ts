import axios from 'axios';

// Mock API for movies
export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3', 
});

export type Movie = {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  category: string;
  isNewEpisode: boolean;
  trailerId: string;
  description: string;
  fullDescription?: string;
  imdbLink?: string;
  tomatoLink?: string;
};

export const getMovies = async (): Promise<Movie[]> => {
  // Mocking an axios call to demonstrate object destructuring on response
  // In a real app, this would be: const { data } = await movieApi.get('/movies');
  const response = {
    data: [
      { 
        id: 1, 
        title: "Duty After School", 
        image: "https://image.tmdb.org/t/p/w500/gLeWTHccMPI60VGs8geiq1b5btV.jpg", 
        rating: 4.8, 
        year: 2023, 
        category: "Series", 
        isNewEpisode: true,
        trailerId: "zYiXxz8Ft0U",
        imdbLink: "https://www.imdb.com/title/tt26675413/",
        tomatoLink: "https://www.rottentomatoes.com/tv/duty_after_school",
        description: "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
        fullDescription: "Duty After School follows the students of Sungjin High School who are forced to undergo military training instead of studying for their college entrance exams to fight against mysterious alien spheres that have appeared in the sky and started attacking humans."
      }, 
      { id: 2, title: "Squid Game", image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg", rating: 4.9, year: 2021, category: "Series", isNewEpisode: false, trailerId: "oqxAJKy0ii4", description: "Ratusan pemain yang kekurangan uang menerima undangan aneh untuk bertanding dalam permainan anak-anak. Di dalam, hadiah menggiurkan menanti — dengan taruhan tinggi yang mematikan." },
      { id: 3, title: "Money Heist", image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", rating: 4.8, year: 2017, category: "Series", isNewEpisode: true, trailerId: "_InqQJRqGW4", description: "Delapan pencuri menyandera dan mengunci diri mereka di Badan Percetakan Uang Spanyol ketika seorang otak kriminal memanipulasi polisi untuk melaksanakan rencananya." },
      {
  id: 4,
  title: "All of Us Are Dead",
  image: "https://image.tmdb.org/t/p/w500/z8CExJekGrEThbpMXAmCFvvgoJR.jpg",
  rating: 4.7,
  year: 2022,
  category: "Series",
  isNewEpisode: false,
  trailerId: "IN5TD4VRcSM",
  description: "Sebuah sekolah menengah menjadi titik nol bagi wabah virus zombie..."
}, 
      { id: 5, title: "Stranger Things", image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", rating: 4.9, year: 2016, category: "Series", isNewEpisode: false, trailerId: "b9EkMc79ZSU", description: "Ketika seorang anak laki-laki menghilang, sebuah kota kecil mengungkap misteri yang melibatkan eksperimen rahasia, kekuatan supernatural yang menakutkan, dan satu gadis kecil yang aneh." },
      { id: 6, title: "The Witcher", image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg", rating: 4.5, year: 2019, category: "Series", isNewEpisode: false, trailerId: "ndl1W4ltcmg", description: "Geralt dari Rivia, seorang pemburu monster bayaran, berjuang mencari tempatnya di dunia di mana manusia seringkali lebih kejam daripada monster." },
      { id: 7, title: "Wednesday", image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg", rating: 4.8, year: 2022, category: "Series", isNewEpisode: true, trailerId: "Di310WS8zLk", description: "Cerdas, sarkastik, dan sedikit mati di dalam, Wednesday Addams menyelidiki pembunuhan berantai sambil mencari teman dan musuh baru di Nevermore Academy." },
      { id: 8, title: "Alice in Borderland", image: "https://image.tmdb.org/t/p/w500/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg", rating: 4.7, year: 2020, category: "Series", isNewEpisode: false, trailerId: "49_44FFKZ1M", description: "Seorang gamer yang terobsesi dan dua temannya mendapati diri mereka berada di Tokyo yang kosong, di mana mereka harus berkompetisi dalam permainan berbahaya untuk bertahan hidup." },
      { id: 9, title: "Breaking Bad", image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", rating: 4.9, year: 2008, category: "Series", isNewEpisode: false, trailerId: "HhesaQXLuRY", description: "Seorang guru kimia sekolah menengah yang didiagnosis menderita kanker paru-paru yang tidak dapat dioperasi beralih ke pembuatan dan penjualan metamfetamin untuk mengamankan masa depan keuangan keluarganya." },
      { id: 10, title: "Peaky Blinders", image: "https://image.tmdb.org/t/p/w500/bGZn5RVzMMXju4ev7xbl1aLdXqq.jpg", rating: 4.8, year: 2013, category: "Series", isNewEpisode: false, trailerId: "oVzVdvGIC7U", description: "Sebuah epik keluarga gangster yang berlatar di Birmingham, Inggris tahun 1919; berpusat pada geng yang menjahit pisau cukur di puncak topi mereka, dan bos mereka yang ambisius, Tommy Shelby." },
      { id: 11, title: "The Queen's Gambit", image: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg", rating: 4.8, year: 2020, category: "Series", isNewEpisode: false, trailerId: "CDrieqwSdgI", description: "Berlatar selama era Perang Dingin, anak yatim piatu yang ajaib dalam catur, Beth Harmon, berjuang melawan kecanduan sambil berusaha menjadi pemain catur terbaik di dunia." },
      { id: 12, title: "Narcos", image: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg", rating: 4.8, year: 2015, category: "Series", isNewEpisode: false, trailerId: "xl8zdCY-abw", description: "Pandangan mendalam tentang penyebaran kokain di seluruh dunia dan upaya penegakan hukum untuk menghentikan para gembong narkoba yang brutal dan kuat." },
      { 
        id: 13,
        title: "The Batman",
        image: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        rating: 4.7,
        year: 2022,
        category: "Film",
        isNewEpisode: false,
        trailerId: "mqqft2E_97w",
        description: "Ketika seorang pembunuh berantai sadis mulai membantai tokoh-tokoh politik penting di Gotham, Batman terpaksa menyelidiki korupsi tersembunyi di kota itu dan mempertanyakan keterlibatan keluarganya."
      },
      { id: 14, title: "Spider-Man: No Way Home", image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", rating: 4.8, year: 2021, category: "Film", isNewEpisode: false, trailerId: "JfVOs4VSpmA", description: "Dengan identitas Spider-Man yang sekarang terungkap, Peter meminta bantuan Doctor Strange. Ketika mantra salah, musuh berbahaya dari dunia lain mulai muncul." },
      { id: 15, title: "Top Gun: Maverick", image: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg", rating: 4.9, year: 2022, category: "Film", isNewEpisode: false, trailerId: "giXco2jaZ_4", description: "Setelah lebih dari tiga puluh tahun mengabdi sebagai salah satu penerbang top Angkatan Laut, Pete Mitchell berada di tempat yang semestinya, mendobrak batasan sebagai pilot uji yang berani." },
      { id: 16, title: "Avatar: The Way of Water", image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 4.7, year: 2022, category: "Film", isNewEpisode: false, trailerId: "d9MyW72ELq0", description: "Jake Sully tinggal bersama keluarga barunya yang terbentuk di planet Pandora. Begitu ancaman akrab kembali untuk menyelesaikan apa yang dimulai sebelumnya, Jake harus bekerja dengan Neytiri dan tentara ras Na'vi untuk melindungi planet mereka." },
      { id: 17, title: "Oppenheimer", image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg", rating: 4.9, year: 2023, category: "Film", isNewEpisode: false, trailerId: "uYPbbksJxIg", description: "Kisah fisikawan Amerika J. Robert Oppenheimer dan perannya dalam pengembangan bom atom." },
      { id: 18, title: "Barbie", image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", rating: 4.5, year: 2023, category: "Film", isNewEpisode: false, trailerId: "pBk4NYhWNMM", description: "Barbie menderita krisis yang membuatnya mempertanyakan dunianya dan keberadaannya." },
      { id: 19, title: "John Wick 4", image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", rating: 4.8, year: 2023, category: "Film", isNewEpisode: false, trailerId: "qEVUrkHu32E", description: "John Wick mengungkap jalan untuk mengalahkan The High Table. Namun sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia." },
      { id: 20, title: "Dune 2", image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", rating: 4.9, year: 2024, category: "Film", isNewEpisode: false, trailerId: "Way9Dexny3w", description: "Paul Atreides bersatu kembali dengan Chani dan kaum Fremen saat sedang berada dalam jalur balas dendam terhadap para konspirator yang menghancurkan keluarganya." },
      { id: 21, title: "The Last of Us", image: "https://image.tmdb.org/t/p/w500/uKvH56PMfBdt9o1n6C62o8A2pZU.jpg", rating: 4.8, year: 2023, category: "Series", isNewEpisode: false, trailerId: "uLtkt8BonwM", description: "Setelah pandemi global menghancurkan peradaban, seorang penyintas yang tangguh mengambil tanggung jawab atas seorang gadis berusia 14 tahun yang mungkin merupakan harapan terakhir umat manusia." },
      { id: 22, title: "Succession", image: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg", rating: 4.9, year: 2018, category: "Series", isNewEpisode: false, trailerId: "OzY29QmesZ8", description: "Kisah keluarga Roy — Logan Roy dan keempat anaknya — yang mengendalikan salah satu konglomerat media dan hiburan terbesar di dunia." },
    ],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  };

  const { data } = response;
  return data;
};

export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  const movies = await getMovies();
  return movies.find(m => m.id === id);
};
