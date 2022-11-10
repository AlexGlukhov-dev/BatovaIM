import classes from './sizeTable.module.scss'
const SizesTable = () => {

	return (<>
		<table className={classes["table"]}>
			<thead>
			<tr>
				<td>Размер</td>
				<td>92</td>
				<td>98</td>
				<td>104</td>
				<td>110</td>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>Возраст, г</td>
				<td>1,5 - 2</td>
				<td>2 - 3</td>
				<td>3 - 4</td>
				<td>4 - 5</td>
			</tr>
			<tr>
				<td>Обхват груди, см</td>
				<td>56</td>
				<td>57</td>
				<td>58</td>
				<td>59</td>
			</tr>
			<tr>
			<td>Обхват талии, см</td>
			<td>51,5</td>
			<td>52</td>
			<td>53</td>
			<td>54</td>
			</tr>
			<tr>
				<td>Обхват бедер, см</td>
				<td>60</td>
				<td>61,5</td>
				<td>63</td>
				<td>64,5</td>
			</tr>
			</tbody>
		</table>
			<span className={classes["info-text"]}>* измерения могут отличаться на 0.5&nbsp;-&nbsp;1.0&nbsp;см</span>
		</>
	)
};

export default SizesTable;