import HeroBanner from '../../home/HeroBanner'
import FitFinder from '../../home/FitFinder'
import ShopByCategory from '../../home/ShopByCategory'
import WhatsNew from '../../home/WhatsNew'
import SplitBanner from '../../home/SplitBanner'
import ShopMenWomen from '../../home/ShopMenWomen'
import VarsityPrep from '../../home/VarsityPrep'
import NewsletterSignup from '../../layout/home/NewsletterSignup'
import newArrivalsImg from '../../../assets/images/04_HP_Tile07_dt.jpg'

const Home = () => (
  <div>
    <HeroBanner
      image={newArrivalsImg}
      eyebrow=""
      title="New Arrivals"
      description="Fall forward in fresh styles made for the changing seasons."
      ctas={[
        { label: "Shop Men's New Arrivals", to: '/men' },
        { label: "Shop Women's New Arrivals", to: '/women' },
      ]}
    />
    <div className="h-0.5 bg-gray-200"></div>
    <ShopByCategory />
    <HeroBanner />
    <SplitBanner />
    <ShopMenWomen />
    <VarsityPrep />
    <WhatsNew />
    <FitFinder />
    <NewsletterSignup />
  </div>
)

export default Home
