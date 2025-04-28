import { FaEye } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const DropZone = ({
  dragActive,
  files,
  inputRef,
  handleDrag,
  handleDrop,
  handleChange,
  showImage,
  deleteImage,
  onButtonClick,
}) => {
  return (
    <>
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          id="input-file-upload"
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? 'drag-active' : ''}
        >
          <div className="p-2">
            <p className="">Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
      {files.length > 0 &&
        files.map((file) => {
          return (
            <div className="py-1 px-2 d-flex justify-content-between align-items-center border rounded my-1">
              <p className="m-0">{file.name}</p>
              <div className="flex">
                <button className="mx-1 border-0 bg-transparent" onClick={() => showImage(file)}>
                  <FaEye fontSize={20} className="text-primary" />
                </button>
                <button className="mx-1 border-0 bg-transparent" onClick={() => deleteImage(file)}>
                  <MdCancel fontSize={20} className="text-danger" />
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default DropZone;
