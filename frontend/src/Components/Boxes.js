import { boxdata } from '../boxData'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState } from 'react';


function Boxes() {

    const [data, setData] = useState(boxdata)

    const handleOnDragEnd = (result) => {
        console.log(result)
        if (!result.destination) return;
        const items = Array.from(data)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        setData(items)
    }

    return (
        <div style={{ marginTop: '80px', width: '30%', maxWidth: '300px', position: "fixed", top: '0', right: '5px', backgroundColor: 'ivory' }}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters" >
                    {provided =>
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {data.map((data, index) =>
                                <Draggable key={data.id} draggableId={data.id} index={index}>
                                    {(provided) => (


                                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>


                                            <div className="characters-thumb"><img src={data.image} /></div>
                                            <p>
                                                {data.text}</p>
                                        </li>)}

                                </Draggable>)}{provided.placeholder}</ul>}</Droppable></DragDropContext>
        </div>
    )
}

export default Boxes