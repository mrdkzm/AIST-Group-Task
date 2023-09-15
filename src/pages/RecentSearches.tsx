import { useState, useEffect } from 'react';
import './recentSearches.css'
import {
    Cloud,
    Thunder,
    Sunny
} from "../assets/icons/Icons.jsx"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { WeatherData } from '../types/weatherTypes.ts';

const RecentSearches: React.FC = () => {
    const [resultData, setResultData] = useState<WeatherData[]>([]);
    const existingSearches = useSelector((state: RootState) => state.recentSearches);
    const temperatureMeasure = useSelector((state: RootState) => state.temperature);

    useEffect(() => {
        setResultData(existingSearches)
    }, [existingSearches]);

    

    return (
        <section>
            <div className='footer-container'>
                {
                    resultData && resultData.slice(-5).map((item, index) => {
                        return (
                            <div className='footer-result' key={index}>
                                <div className='footer-city'>{item.city.name}</div>
                                <div className='footer-icon'>
                                    {item.list[0].weather[0].id >= 800 ?
                                        <Cloud className='mood-icons' /> : item.list[0].weather[0].id <= 500 ? <Thunder className='mood-icons' /> : <Sunny className='mood-icons' />
                                    }
                                </div>
                                <div className='footer-temperature'>{temperatureMeasure ? Math.round(item.list[0].main.temp) : Math.round(item.list[0].main.temp) + 273}°</div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default RecentSearches
