import loading from '../../loading.gif';
function Spinner() {
  return (
    <div
      style={{
        height: 500,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <img src={loading} alt="loading" style={{ color: 'red' }} />
    </div>
  );
}

export default Spinner;
