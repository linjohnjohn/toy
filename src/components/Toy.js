import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { Provider, Draggable } from './src/dnd';
import Calendar from './src/components/Calendar';

export default function App() {
    const plans = {
        [new Date(2019, 10, 16).getTime()]: "Arm Day",
        [new Date(2019, 10, 17).getTime()]: "Back Day",
        [new Date(2019, 10, 18).getTime()]: "Core Day",
        [new Date(2019, 10, 19).getTime()]: "Leg Day",
    };

    const [startPotentialDate, setStartPotentialDate] = useState(new Date());
    const [endPotentialDate, setEndPotentialDate] = useState(new Date());


    return (
        <Provider>
            <View style={styles.container}>
                <Calendar dateToPlans={plans}
                    startPotentialDate={startPotentialDate}
                    endPotentialDate={endPotentialDate}
                    onPotentialDateChange={(newDate) => {
                        setStartPotentialDate(newDate);
                        const endDate = new Date(newDate.getTime());
                        endDate.setDate(endDate.getDate() + 2);
                        setEndPotentialDate(endDate);
                    }}
                    onPotentialDateReset={() => {
                        setStartPotentialDate(null);
                        setEndPotentialDate(null);

                    }}
                />

                <Draggable
                    onDragStart={() => {
                        console.log('Started draggging');
                    }}
                    onDragEnd={() => {
                        console.log('Ended draggging');
                    }}
                    payload="my-draggable-item"
                >
                    {({ viewProps }) => {
                        return (
                            <Animated.View
                                {...viewProps}
                                style={[viewProps.style, { width: 50, height: 50, backgroundColor: "red" }]}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    Drag me
                                </Text>
                            </Animated.View>
                        );
                    }}
                </Draggable>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({

});
