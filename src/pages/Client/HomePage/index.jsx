import React, { useEffect, useState } from 'react';
import { getAllCategory, getAllProducts, getAllSlider } from '../../../api/Client/Home/homeAPI';
import ContentHome from '../../../components/client/Home';
import Banner from '../../../components/client/Home/Banner';
import Slider from '../../../components/client/Home/Slider';
import { ErrorToast } from '../../../components/commons/Layouts/Alerts';

export function HomePage(props) {
  const [slider, setSlider] = useState([]);
  const [banner, setBanner] = useState([]);
  const [dataBestSale, setDataBestSale] = useState([]);
  const [dataNewArrive, setDataNewArrive] = useState([]);
  const [dataOverview, setDataOverview] = useState([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingBanner, setIsLoadingBanner] = useState(true);
  const [isLoadingSlider, setIsLoadingSlider] = useState(true);
  const sell = 'bestsale';
  const sort = 'desc';

  const handleGetAllProductBestSale = async () => {
    const result = await getAllProducts({ sell });
    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    }
    setDataBestSale(result.data);
    setIsLoadingProduct(false);
  };
  const handleGetAllProductNewArrive = async () => {
    const result = await getAllProducts({ sort });
    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    }
    setDataNewArrive(result.data);
    setIsLoadingProduct(false);
  };
  const handleGetAllProductOverview = async () => {
    const result = await getAllProducts({});
    if (result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    }
    setDataOverview(result.data);
    setIsLoadingProduct(false);
  };

  const handleGetAllSlider = async () => {
    const result = await getAllSlider();
    setSlider(result.data);
    setIsLoadingSlider(false);
  };

  const handleGetAllCategory = async () => {
    const result = await getAllCategory();
    setBanner(result.data);
    setIsLoadingBanner(false);
  };

  useEffect(() => {
    handleGetAllProductNewArrive();
    handleGetAllProductBestSale();
    handleGetAllProductOverview();
    handleGetAllSlider();
    handleGetAllCategory();
  }, [sell, sort]);

  return (
    <section>
      <Slider slider={slider} isLoadingSlider={isLoadingSlider} />
      <Banner banner={banner} isLoadingBanner={isLoadingBanner} />

      <ContentHome
        isLoadingProduct={isLoadingProduct}
        dataBestSale={dataBestSale}
        dataNewArrive={dataNewArrive}
        dataOverview={dataOverview}
      />
    </section>
  );
}
