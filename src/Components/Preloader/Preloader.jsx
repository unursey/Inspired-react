import { BallTriangle } from 'react-loader-spinner';

const style = {
	display: 'flex',
	justifyContent: 'center',
	padding: '100px 0'
}

export const Preloader = () => (
  <div style={style}>
		<BallTriangle
			height={100}
			width={100}
			radius={5}
			color="#000000"
			ariaLabel="ball-triangle-loading"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
		/>
  </div>
)