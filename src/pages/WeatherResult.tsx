import './weatherResult.css'
import { useState, useEffect, useCallback } from 'react';
import {
    TemperatureIcon, Cloud,
    LocationIcon,
    SearchIcon,
    Thunder,
    Sunny
} from "../assets/icons/Icons.js"
import { Switch } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';
import { addSearch } from '../features/recentSearchesSlice.js';
import { WeatherData } from '../types/weatherTypes.ts';
import { toggleTemperatureMeasure } from '../features/temperatureSlice.tsx';
import { RootState } from '../store/store';

const HomePage: React.FC = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [cityName, setCityName] = useState<string>('Baku')
    const [errorMesage, setErrorMesage] = useState<string>('')
    // const [temperatureMeasure, setTemperatureMeasure] = useState<boolean>(true);
    const [value, setValue] = useState('1');
    const temperatureMeasure = useSelector((state: RootState) => state.temperature);
    const dispatch = useDispatch();


    const handleTabChange = useCallback(
        (event: React.SyntheticEvent, newValue: string) => {
            setValue(newValue);
        },
        []
    );

    const handleTextFieldKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (/^\d$/.test(event.key)) {
                event.preventDefault(); 
            }
        },
        []
    );


    const handleTextFieldChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setCityName(event.target.value);
        },
        []
    );


    const handleTemperatureChange = useCallback(
        () => {
            // setTemperatureMeasure(!temperatureMeasure);
            dispatch(toggleTemperatureMeasure());

        },
        [dispatch]
    );


    

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement> | null) => {
            e && e.preventDefault()
            if (cityName.length > 0) {
                axios
                    .get<WeatherData>(
                        `${import.meta.env.VITE_API_URL}?q=${cityName.trim()}&appid=${import.meta.env.VITE_API_KEY}&cnt=2&units=metric`
                    )
                    .then(res => {
                        setData(res.data);

                    })
                    .catch((err) => {
                        setData(null);
                        if (err.response.status === 404) {
                            setErrorMesage('Axtarışınıza uyğun nəticə tapılmadı')
                        }
                        else {
                            setErrorMesage('Serverdə xəta baş verdi')
                        }
                    });
            }
        },
        [cityName]
    );


    const formatDate = (date: Date): string => {
        const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const month: string = monthNames[date.getMonth()];
        const day: number = date.getDate();
        const dayOfWeek: string = dayNames[date.getDay()];

        return `${month} ${day}, ${dayOfWeek}`;
    }

    //   current date
    const currentDate: Date = new Date();

    //  tomorrow's date
    const tomorrowDate: Date = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    // Format both dates
    const todayDateFormatted: string = formatDate(currentDate);
    const tomorrowDateFormatted: string = formatDate(tomorrowDate);

    const times: string[] = [todayDateFormatted, tomorrowDateFormatted];

    useEffect(() => {
        handleSubmit(null);
    }, []);



    useEffect(() => {
        if (data) {
            data && window.localStorage.setItem('recentSearches', JSON.stringify(data));
            const existingSearchesString = window.localStorage.getItem('recentSearches');
            const existingSearches: WeatherData[] = existingSearchesString
                ? JSON.parse(existingSearchesString)
                : [];
            dispatch(addSearch(existingSearches))
        }

    }, [data, dispatch]);

    
    return (
        <section>
            <div className='main-container'>
                <div className='temp-container'>
                    <span className='temp-text'>°C</span>
                    <Switch
                        color="success"
                        checked={!temperatureMeasure}
                        onChange={handleTemperatureChange}

                    /> <span className='temp-text'> °F </span>
                </div>
                <div className='tab-container'>
                    <TabContext value={value}>
                        <TabList onChange={handleTabChange} aria-label="Weather Result" centered>
                            <Tab label="Today" value="1" />
                            <Tab label="Tomorrow" value="2" />
                        </TabList>
                        <div className='searching-container'>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <TextField
                                    onChange={handleTextFieldChange}
                                    onKeyDown={handleTextFieldKeyDown}
                                    type='text'
                                    value={cityName}

                                />
                                <button className='searching-btn' type='submit'>
                                    <SearchIcon className='searching-icon' />
                                </button>
                            </form>
                        </div>

                        {
                            data ? data.list.map((item, index) => {
                                return (
                                    <TabPanel value={(index + 1).toString()} key={index}>
                                        <div className='info-container'>
                                            <div className='info-first'><span className='city'> {data.city.name} <LocationIcon /></span> <span className='date inline'> {times[index]}</span></div>
                                            <div className='info-second'>
                                                <div className='info-icon-temp-container'>
                                                    <TemperatureIcon className='temperature-icon' />
                                                    <span className='temperature-result'>{temperatureMeasure ? Math.round(item?.main?.temp) :  Math.round(item?.main?.temp) + 273}°{temperatureMeasure  ? 'C' : 'F'}</span>
                                                </div>

                                                {item.weather[0].id >= 800 ?
                                                    <Cloud className='responsive-mood-icons' /> : item.weather[0].id <= 500 ? <Thunder className='responsive-mood-icons' /> : <Sunny className='responsive-mood-icons' />
                                                }
                                            </div>
                                            <div className='info-third'>
                                                <div>
                                                    <span className='date'> HUMITIDY </span>
                                                    <span className='value'>{item?.main?.humidity}%</span>
                                                </div>
                                                <div>
                                                    <span className='date'> WIND</span>
                                                    <span className='value'>{Math.round(item?.wind?.speed)}{" "}mph</span>
                                                </div>

                                            </div>
                                        </div>
                                    </TabPanel>
                                )
                            }) : <Alert severity="error" className='error-message'>
                                {errorMesage}
                            </Alert>
                        }
                    </TabContext>

                </div>
            </div>

        </section>
    )
}

export default HomePage
