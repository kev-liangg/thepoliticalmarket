import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing'
import { shelterstate } from './shelter-state';

const ShelterBubbleChart = () => (
        
    <ResponsiveCirclePackingCanvas
        data={shelterstate}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        colors={{ scheme: 'pastel1' }}
        colorBy="id"
        childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
        padding={1}
        leavesOnly={true}
        enableLabels={true}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', '3' ] ] }}
        borderWidth={1}
        borderColor="#ffffff"
        animate={false}
    />
)

export default ShelterBubbleChart;
