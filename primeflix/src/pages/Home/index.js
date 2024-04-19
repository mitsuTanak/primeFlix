import { memo, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Loading } from '../../components';

import imageNotFound from '../../assets/images/placeholder.png';
import placeholderImage from '../../assets/glyphicons/picture-grey.svg';
import loadingImage from '../../assets/images/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-circular-progressbar/dist/styles.css';

import styles from './styles.module.css';
import api from '../../services/api';

function Home() { //Define p componente funcional Home 

    const[movies, setMovies] = useState([]); // Define o estado 'movies' para armazenar a lista de filmes
    const[loading, setLoading] = useState(true); // Define o estado 'loading' para indicar se a pagina está carregando
    const[loadingSearch, setloadingSearch] = useState(false); // Define o estado 'loadingSearch' para indicar se a busca está carregando
    const[search, setSearch] = useState(''); // Define o estado 'search' para armazenar o termo de buscado usuario
    const[search, setSearch] = useSt1ate(); // Define o estado 'search' para armazenar o termo de buscado usuario
    const[counts, setCounts] = useState({// Define o estado 'counts' para armazenar informações sp
        total_pages: 500,
        total_results: 10000
    }); 
}