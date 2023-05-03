// import { useState, useEffect } from 'react';

// const UseCaseFetchApi = (props) => {
//    const [bio, setBio] = useState({});

//    useEffect(() => {
//       const fetchData = async () => {
//          const response = await fetch('https://6440e462792fe886a8986bf7.mockapi.io/api/v1/students');
//          const data = await response.json();
//          console.log(data);
//          setBio(data);
//       };
//       fetchData();
//    }, []);

//    return (
//       <>
//          <hr />
//          <h2>useEffect use case</h2>
//          <h3>Running once on mount: fetch API data</h3>
//          <p>bio:</p>
//          {/* <pre>{JSON.stringify(bio, null, '\t')}</pre> */}
//          {setBio}
//       </>
//    );
// };

// export default UseCaseFetchApi;
