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
    const[currentPage, setCurrentPage] = useState(1); // Define o estado 'currentPage' para armazenar o número da pagina
    const[counts, setCounts] = useState({// Define o estado 'counts' para armazenar informações spbre p tptal de páginas e resiltados.
        total_pages: 500,
        total_results: 10000
    }); 

    const formaDate = (value) => {//Funçõa para formatar a data de lançamento do filme

        if (value === null) return 'Não disponivel';

        let options = {
            timeZone: 'America/Sao_Paulo',
            hour12: true,
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };

        const date = new Date(value);
        returndate.toLocalDateString('pt-br', options);

    }

    const handleSubmit = (e) => {//Função para lidar com o envio do formulario de pesquisa

        e.preventDefault();

        setSearch(search);//Atualiza o termo de busca
        setcurrentPage(1); // Reseta a página atual para a primeira página
    }

    const handleChange = (e) => {// Função para lidar com a alteração do campo de busca

        setSearch(e.target.value);// Atualiza a busca
        setCurrentPage(1);

    }

    const loadMoreItems = useRef(0); //Controla o número de vezes de carregar mais itens na pagina

    useEffect(() => {//Efeito de Carregamento
        
        async function loadMovies() {//Função asincrona para carregar os filmes
            const params = {//Parâmetros de requisição á API
                params:{
                    page: currentPage
                }
            };

            if(search !== '') {//Se houver um termo de busca, adiciona o pârametro de busca aos parametro da requisição
                params.params.query = search;
            }

            const url = (search === '') ? 'movie/now_playing' : 'search/movie'; //Muda a URL para corresponder a busca

            const response = await api.get(url, params);//Faz a requisição á API

            const {results, total_pages, total_results} = response.data;//Pega a resposta da API

            setMovies((previous) =>//Atualiza a lista de filmes no estado, adicionado novos filmes se a página atual for maior que 1
                currentPage === 1 ? results : [...preavious, ...results]
            );

            setCounts({//Atualiza as info sobre o total de paginas e resultados
                total_pages: total_pages,
                total_results: total_results
            });

            setloadingSearch(false);//Indica que parou de buscar
            setLoading(false); //Indica que a pagina parou de carregar

        }

        loadMovies();//Chama a função para carregar os filmes
    }, [search, currentPage]);//Reexecuta sempre que os termos atulaizarem


    const handleLoadMore = () => {//Função para carregar mais filmes quando solicitado
        if (loadingMoreItems.current < 2) { // Permite que reecarege só 2 vezes
            setCurrentPage((page) => page + 1);//atualiza
            setloadingSearch(true);//Indica que está buscando
            loadMoreItems.current++;//Adiciona o carregamento ao contador
        }
    }

    if (loading) {
        return(
            <Loading text='Carregando filmes...'/>
        )
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {/* Título */}
                <div className={styles.grid_title}>
                    <h1>Bem-Vindo(a).</h1>
                    <p>Milhões de filmes, séries e Pessoas para Descobrir. Explore já.</p>
                    <form onSubmit={handleSubmit}>
                        {/* Campo de Pesquisa */}
                        <input 
                            type='search'
                            name='search'
                            id='search'
                            placeholder='Pesquise pelo seus filme FAVORITO...'
                            onChange={handleChange}
                            value={search || ''}
                        />
                        {/* Botão de Pesquisa */}
                        <button type='submit'>
                            {/* Icone */}
                            <FontAwesomeIcon icon={faSearch} size='x1'/>
                        </button>

                    </form>

                </div>

            </div>

        </div>

        <div className={styles.list_movies}>
            {
                movies.map((movie) => (
                    <article key={movie.id}>
                        {/* Link para a página do filme */}
                        <Link to={`/movie/${movie.id}`}>
                            {
                                movie.poster_past !== null ? (
                                    <LazyLoadImage
                                        src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                        effect='blur'
                                        alt={movie.title}
                                        title={movie.title}
                                        placeholderSrc={placeholderImage}
                                    />
                                ) : (
                                    //Exibe uma imagem padrão em caso de erro
                                    <img 
                                        src={imageNotFound}
                                        alt={movie.title}
                                        title={movie.title}
                                    />
                                )
                            }
                        </Link>
                        {/* Exibe uma barra d eprogresso */}
                    </article>

                ))
                
            }
        </div>
    )
}