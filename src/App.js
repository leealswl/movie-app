import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from './layout/AppLayout';
import {Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Moviepage from './pages/Movies/Moviepage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFoundpage from './NotFoundpage/NotFoundpage';

// 홈페이지 주소 (/)
// 영화전체보여주는 페이지 주소 (/movies)
// 영화 디테일 페이지 주소 (/movies/:id)
// 추천 영화 /movies/:id/recommandation
// 리뷰 /movies/:id/reviews
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AppLayout/>}> 
          <Route index element={<Homepage />}/>
          
          <Route path='movies'> 
            <Route index element={<Moviepage />}/>
            <Route path=':id' element={<MovieDetail/>}/>
          </Route>
        
        </Route>

        <Route path='*' element={<NotFoundpage />}/>
      </Routes>
      
    </div>
  );
}

export default App;
