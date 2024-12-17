import React, { ReactNode } from 'react';

export const Popup = ({ children, closePopup }: { children: ReactNode; closePopup: () => void }) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full md:w-3/4 lg:w-1/2 overflow-y-auto max-h-[90vh]'>
				<div className='flex justify-end items-center mb-4'>
					<button onClick={closePopup} className='text-gray-500 hover:text-gray-800 focus:outline-none'>
						&#10005;
					</button>
				</div>

				<div>{children}</div>
			</div>
		</div>
	);
};
