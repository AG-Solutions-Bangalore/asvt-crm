// import { useState } from "react";

// const ProfileImageCell = ({ imageUrl, alt }) => {
//   const [loading, setLoading] = useState(true);

//   return (
//     <div style={{ position: "relative", width: "50px", height: "50px" }}>
//       {loading && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               width: "20px",
//               height: "20px",
//               border: "2px solid rgba(0, 0, 0, 0.1)",
//               borderTop: "2px solid #4F46E5",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           />
//         </div>
//       )}
//       <img
//         src={imageUrl}
//         alt={alt}
//         style={{
//           width: "50px",
//           height: "50px",
//           borderRadius: "50%",
//           objectFit: "cover",
//           display: loading ? "none" : "block",
//         }}
//         onLoad={() => setLoading(false)}
//         onError={() => setLoading(false)}
//       />
//     </div>
//   );
// };
// export default ProfileImageCell;
import { useState } from "react";
import { NoImagePath } from "../../base/BaseUrl";

const ProfileImageCell = ({ imageUrl, alt }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: "relative", width: "50px", height: "50px" }}>
      {(loading || error) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading && !error ? (
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderTop: "2px solid #4F46E5",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <img
              src={NoImagePath}
              alt="No Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      )}

      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          display: loading || error ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default ProfileImageCell;
