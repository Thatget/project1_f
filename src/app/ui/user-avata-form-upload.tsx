'use client';

import { useCallback, useRef } from 'react';
import { upload } from '../actions/upload';
import { BiSolidFace } from 'react-icons/bi';
import { useFormState } from 'react-dom';
import { TRUser } from '@/src/models/user.model';

const UserAvataFormUpload = ({
  user,
  modal,
  handleModal,
}: {
  user: TRUser;
  modal: boolean;
  handleModal: () => void;
}) => {
  const [state, formAction] = useFormState(upload, null);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickImage = useCallback(() => {
    if (inputRef.current) inputRef.current?.click();
  }, [inputRef]);
  console.log('state: ', state);
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div
        className={`fixed inset-0 bg-gray-500 transition-opacity ${modal ? 'bg-opacity-75 visible' : 'bg-opacity-0 invisible'}`}
        aria-hidden="true"
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <form action={formAction} id="upload-avata">
                  <input type="file" name="avata" hidden ref={inputRef} />
                  {user?.avata ? (
                    <img onClick={handleClickImage} className=" p-1 bg-white hover:cursor-pointer" src={user?.avata} />
                  ) : (
                    <BiSolidFace size={34} onClick={handleClickImage} />
                  )}
                  {state?.errors?.avata && state?.errors.avata[0] && (
                    <p className="text-red-700 font-serif font-thin mx-auto w-full">{state?.errors?.avata[0]}</p>
                  )}
                </form>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                form="upload-avata"
              >
                Save
              </button>
              <button
                onClick={handleModal}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvataFormUpload;
