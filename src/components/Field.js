import React, { useState, useRef, useEffect } from "react";

function Field({ players, onPositionChange, teamColors }) {
  const [positions, setPositions] = useState(() =>
    players.reduce((acc, p) => {
      acc[p["Player Name"]] = { x: 50, y: 50 };
      return acc;
    }, {})
  );

  const dragItem = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const fieldRef = useRef(null);

  useEffect(() => {
    setPositions(
      players.reduce((acc, p) => {
        acc[p["Player Name"]] = positions[p["Player Name"]] || { x: 50, y: 50 };
        return acc;
      }, {})
    );
  }, [players]);

  const onDragStart = (e, playerName) => {
    dragItem.current = playerName;
    const playerBox = e.target.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - playerBox.left,
      y: e.clientY - playerBox.top,
    };
  };

  const onDragEnd = (e) => {
    if (!dragItem.current) return;
    const fieldRect = fieldRef.current.getBoundingClientRect();

    let newX = e.clientX - fieldRect.left - dragOffset.current.x;
    let newY = e.clientY - fieldRect.top - dragOffset.current.y;
    newX = Math.max(0, Math.min(newX, fieldRect.width - 40));
    newY = Math.max(0, Math.min(newY, fieldRect.height - 40));

    setPositions((pos) => {
      const newPos = { ...pos, [dragItem.current]: { x: newX, y: newY } };
      onPositionChange && onPositionChange(dragItem.current, newPos[dragItem.current]);
      return newPos;
    });
    dragItem.current = null;
  };

  return (
    <div
      ref={fieldRef}
      style={{
        width: "800px",
        height: "500px",
        border: "2px solid #4caf50",
        borderRadius: "10px",
        position: "relative",
        margin: "auto",
        backgroundColor: "#e8f5e9",
        touchAction: "none",
      }}
    >
      {players.map((player) => {
        const pos = positions[player["Player Name"]];
        const team = player["Club Name"];
        const color = teamColors[team]?.playerColor || "#2196f3";
        const fontColor = teamColors[team]?.fontColor || "#fff";
        return (
          <div
            key={player["Player Name"]}
            onMouseDown={(e) => onDragStart(e, player["Player Name"])}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              onDragStart({ clientX: touch.clientX, clientY: touch.clientY, target: e.target }, player["Player Name"]);
            }}
            onMouseUp={onDragEnd}
            onTouchEnd={onDragEnd}
            style={{
              position: "absolute",
              left: pos ? pos.x : 0,
              top: pos ? pos.y : 0,
              width: "40px",
              height: "40px",
              borderRadius: "20px",
              backgroundColor: color,
              color: fontColor,
              textAlign: "center",
              lineHeight: "40px",
              fontWeight: "bold",
              userSelect: "none",
              cursor: "grab",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
          >
            <div>{player["Jersey Number"]}</div>
            <div
              style={{
                position: "absolute",
                width: "80px",
                top: "45px",
                left: "-20px",
                fontSize: "12px",
                color: "#333",
                whiteSpace: "nowrap",
              }}
            >
              {player["Player Name"].split(" ").slice(-1)[0]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Field;
