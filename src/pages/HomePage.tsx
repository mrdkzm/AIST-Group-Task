import './homepage.css'
import { useState, useEffect } from 'react';
import {
    MainLogo, TemperatureIcon, Cloud,
    // Thunder,
    // Sunny
} from "../assets/icons/Icons.jsx"
import { Switch } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextField } from '@mui/material';

import axios from 'axios';

interface WeatherData {
    city: {
        name: string;
    };
    list: {
        main: {
            temp: number;
            humidity: number;
        };
        wind: {
            speed: number;
        };
    }[];
}



const HomePage: React.FC = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [temperatureMeasure, setTemperatureMeasure] = useState<'metric' | 'standart'>('metric');
    const [value, setValue] = useState('1');

    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTemperatureMeasure(e.target.checked ? 'standart' : 'metric');
    };  
  


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    
    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event.target.value);
      }

    useEffect(() => {
        axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=515f65a2f5f523edd061cd1565b7e0db&cnt=2&units=${temperatureMeasure}`)
            .then((res) => setData(res.data))
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [temperatureMeasure]);

    function formatDate(date: Date): string {
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

    return (
        <section>
            <div className='logo-container'>
                <MainLogo />
                <h1 className='logo-header'>Hotlify</h1>
            </div>

            <div className='main-container'>
                <div className='temp-container'>
                    <span className='temp-text'>°C</span>    
                    <Switch
        color="success"
        checked={temperatureMeasure === 'standart'}
        onChange={handleTemperatureChange}
      /> <span className='temp-text'> °F </span>
                </div>
                <div className='tab-container'>
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Today" value="1" />
                            <Tab label="Tomorrow" value="2" />
                        </TabList>
                        <TextField
                          style={{
                            backgroundColor: 'white',
                            width: '711px',
                            height: '66px',
                          }}
        onChange={handleTextFieldChange}
      />
                             {
                            data?.list?.map((item, index) => {
                                return (
                                    <TabPanel value={(index + 1).toString()} >
                                        <div className='info-container'>
                                            <div className='info-first'><span className='city'> {data.city.name}</span> <span className='date inline'> {times[index]}</span></div>
                                            <div className='info-second'>
                                                <TemperatureIcon />
                                                <span className='temperature-result'>{Math.round(item?.main?.temp)}°{temperatureMeasure === 'metric' ? 'C' : 'F'}</span>
                                                <Cloud />
                                                {/* <Thunder /> */}
                                                {/* <Sunny /> */}
                                            </div>
                                            <div className='info-third'>
                                                <div>
                                                    <span className='date'> HUMITIDY </span>
                                                    <span>{item?.main?.humidity}%</span>
                                                </div>
                                                <div>
                                                    <span className='date'> WIND</span>
                                                    <span>{Math.round(item?.wind?.speed)}{" "}mph</span>
                                                </div>

                                            </div>
                                        </div>
                                    </TabPanel>
                                )
                            })
                        }

                        {/* <TabPanel value="2">Tomorrow</TabPanel> */}
                    </TabContext>
                </div>
            </div>


            <div className='footer-container'>
                <div className='footer-result'>
                    <div className='footer-city'>Baku</div>
                    <div></div>
                    <div className='footer-temperature'>27C</div>
                </div>
                <div className='footer-result'>
                    <div className='footer-city'>Baku</div>
                    <div></div>
                    <div className='footer-temperature'>27C</div>
                </div>
                <div className='footer-result'>
                    <div className='footer-city'>Baku</div>
                    <div></div>
                    <div className='footer-temperature'>27C</div>
                </div>
                <div className='footer-result'>
                    <div className='footer-city'>Baku</div>
                    <div></div>
                    <div className='footer-temperature'>27C</div>
                </div>
                <div className='footer-result'>
                    <div className='footer-city'>Baku</div>
                    <div></div>
                    <div className='footer-temperature'>27C</div>
                </div>

            </div>
        </section>
    )
}

export default HomePage
