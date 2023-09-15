import {Link} from 'react-router-dom';
import './notFound.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__message">Извините, страница, которую вы ищете, не найдена.</p>
            <p className="not-found-page__link">
                <Link to="/" className="not-found-page__link-text">Вернуться на главную страницу</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;