import { useEffect,useState } from "react";
import "./styles.css"

export default function ScrollIndicator({url}){
    const[data,setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[errorMsg,setErrorMsg] = useState("");
    const[scrollPercentage, setScrollPercentage] = useState(0);

    async function fetchData(getUrl){
        try{
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();
            if( data && data.products && data.products.length > 0 ){
                setData(data.products);
                setLoading(false);
            }
        }
        catch(e){
            console.log(e);
            setErrorMsg(e.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    },[url]);


    function handleScrollPercentage() {
        console.log(
            document.body.scrollTop,
            document.documentElement.scrollTop,
            document.documentElement.scrollHeight
        );

        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercentage( ( howMuchScrolled / height ) * 100 );
    }

    useEffect( () =>{
        window.addEventListener("scroll", handleScrollPercentage);
        return () => {window.removeEventListener("scroll", () => {} )};
    },[]);

    console.log(data, scrollPercentage);

    if(errorMsg){
        return<div>Errrorrr !!!.... {errorMsg}</div>;
    }
    if(loading){
        return<div>Loadinggg !!!.... Please Waittt</div>
    }

    
    return(
        <div>
            <div className="scrollindicator-container">
                <h1> Custom Scroll Indicator</h1>
                <div className="scrollindicator-progress-tracking">
                    <div className="scrollindicator-current-progress"
                      style={ {width : `${scrollPercentage}%` }}>
                        <span>{`${Math.round(scrollPercentage)}%`}</span>
                    </div>
                </div>
            </div>

            <div className="scrollindicator-data-container">
                {data && data.length > 0 
                ? 
                    data.map((dataItem) => <p>{dataItem.title}</p>) 
                :
                null
                }
            </div>
        </div>
    );
}