import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Home() {
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [featuredListing, setFeaturedListing] = useState(null);

    useEffect(() => {
        const fetchFeaturedListing = async () => {
            try {
                const res = await fetch('/api/listing/get?featured=true&limit=1');
                const data = await res.json();
                setFeaturedListing(data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFeaturedListing();
        fetchRentListings();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div className='bg-gray-100 py-20 px-6 text-center'>
                <h1 className='text-slate-800 font-bold text-4xl lg:text-6xl'>
                    Your <span className='text-blue-600'>Perfect Home</span> Awaits
                </h1>
                <p className='text-gray-600 mt-4 text-lg'>
                    Explore a wide range of properties for rent or sale. Let’s help you find your dream space today.
                </p>
                <Link
                    to={'/search'}
                    className='mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition'>
                    Start Exploring
                </Link>
            </div>

            {/* Featured Listing */}
            {featuredListing && (
                <div className='max-w-6xl mx-auto my-10 p-4'>
                    <h2 className='text-2xl font-semibold text-slate-700'>Featured Property</h2>
                    <div
                        className='mt-6 rounded-lg shadow-lg bg-cover bg-center h-[400px] flex items-end p-6'
                        style={{
                            backgroundImage: `url(${featuredListing.imageUrls[0]})`,
                        }}>
                        <div className='bg-white p-4 rounded-lg shadow-md'>
                            <h3 className='text-lg font-bold text-slate-700'>{featuredListing.name}</h3>
                            <p className='text-gray-600'>{featuredListing.address}</p>
                            <Link
                                to={`/listing/${featuredListing._id}`}
                                className='text-blue-800 font-bold mt-2 hover:underline'>
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Listings for Rent */}
            {rentListings && rentListings.length > 0 && (
                <div className='max-w-6xl mx-auto my-10 p-4'>
                    <h2 className='text-2xl font-semibold text-slate-700'>Top Places for Rent</h2>
                    <div className='flex flex-wrap gap-6 mt-6'>
                        {rentListings.map((listing) => (
                            <ListingItem listing={listing} key={listing._id} />
                        ))}
                    </div>
                    <Link
                        to={'/search?type=rent'}
                        className='mt-4 inline-block text-blue-800 font-bold hover:underline'>
                        View More Rentals
                    </Link>
                </div>
            )}

            {/* Listings for Sale */}
            {saleListings && saleListings.length > 0 && (
                <div className='max-w-6xl mx-auto my-10 p-4'>
                    <h2 className='text-2xl font-semibold text-slate-700'>Top Places for Sale</h2>
                    <div className='flex flex-wrap gap-6 mt-6'>
                        {saleListings.map((listing) => (
                            <ListingItem listing={listing} key={listing._id} />
                        ))}
                    </div>
                    <Link
                        to={'/search?type=sale'}
                        className='mt-4 inline-block text-blue-800 font-bold hover:underline'>
                        View More Properties for Sale
                    </Link>
                </div>
            )}

            {/* Footer */}
            <footer className='bg-gray-800 text-white py-8'>
                <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* Column 1 */}
                    <div>
                        <h3 className='text-lg font-bold'>Salman Estate</h3>
                        <p className='text-gray-400 mt-2'>
                            Find your next perfect place to live or invest with Salman Estate.
                        </p>
                    </div>
                    {/* Column 2 */}
                    <div>
                        <h3 className='text-lg font-bold'>Quick Links</h3>
                        <ul className='mt-4 space-y-2'>
                            <li>
                                <Link to='/about' className='text-gray-400 hover:text-white'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to='/search' className='text-gray-400 hover:text-white'>
                                    Explore Listings
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Column 3 */}
                    <div>
                        <h3 className='text-lg font-bold'>Contact</h3>
                        <p className='text-gray-400 mt-2'>Phone: +91 8073155802</p>
                        <p className='text-gray-400'>Email: salman.kulur@gmail.com</p>
                        <p className='text-gray-400 mt-4'>
                            Address: Mangalore
                        </p>
                    </div>
                </div>
                <div className='mt-8 border-t border-gray-700 text-center py-4 text-gray-400'>
                    &copy; {new Date().getFullYear()} Salman Estate. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
