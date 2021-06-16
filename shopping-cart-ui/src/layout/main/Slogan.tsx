import { Link } from 'react-router-dom';
import Search from './Search';
import TopMenu from './TopMenu';
import TopMenuData from './TopMenuData';
import MyAccount from './MyAccount';

interface ISlogan {
    logo: JSX.Element;
    name: string;
    description: string;
}

export default function Slogan(prop: ISlogan): JSX.Element {
    const { logo, name, description } = prop || {};
    return (
        <div className="main-slogan">
            <div className="main-slogan-logo">
                {logo}
                <div className="main-slogan-content">
                    <Link to="/">
                        <span className="main-slogan-text">{name}</span>
                    </Link>
                    <span className="main-slogan-desc">{description}</span>
                </div>
            </div>
            <Search />
            <TopMenu data={TopMenuData} />
            <MyAccount />
        </div>
    );
}
