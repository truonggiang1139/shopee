import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { IBody, getProfile, updateProfile } from "src/apis/user.api";
import { Controller, useForm } from "react-hook-form";
import { UserSchema, userSchema } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import Input from "src/components/Input";
import { toast } from "react-toastify";
import InputNumber from "src/components/InputNumber";
import DateSelector from "../../components/DateSelector";
export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const previewImg = useMemo(() => {
    return currentFile ? URL.createObjectURL(currentFile) : "";
  }, [currentFile]);
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });
  const userMutation = useMutation({
    mutationFn: (body: IBody) => updateProfile(body)
  });
  const userData = data?.data.data;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<UserSchema>({
    defaultValues: {
      name: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(2000, 9, 28),
      phone: ""
    },
    resolver: yupResolver<UserSchema>(userSchema as ObjectSchema<UserSchema>)
  });
  const onSubmit = handleSubmit((data) => {
    userMutation.mutate(
      { ...data, date_of_birth: data.date_of_birth?.toISOString() },
      {
        onSuccess: (data) => {
          refetch();
          toast.success(data.data.message);
        }
      }
    );
  });
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFile(event.target.files?.[0]);
  };
  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("phone", userData.phone || "");
      setValue("address", userData.address || "");
      setValue("avatar", userData.avatar || "");
      setValue("date_of_birth", userData.date_of_birth ? new Date(userData.date_of_birth) : new Date(2000, 9, 28));
    }
  }, [setValue, userData]);
  if (!userData) return;
  return (
    <div className="rounded-sm bg-white px-2 pb-10 text-base shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Thông tin cá nhân</h1>
      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start ">
        <form className="mt-6 flex-grow pr-12 md:mt-0 md:border-r md:border-r-gray-200" onSubmit={onSubmit}>
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Email</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <div className="pt-3 text-gray-700">{userData.email}</div>
            </div>
          </div>
          <div className="mt-3 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Tên</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="name" register={register} errorMessage={errors.name?.message} />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Số điện thoại</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <InputNumber
                    name="phone"
                    value={field.value}
                    onChange={field.onChange}
                    classNameInput="w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Địa chỉ</div>
            <div className="sm:w-[80%] sm:pl-5 ">
              <Input name="address" register={register} errorMessage={errors.address?.message} />
            </div>
          </div>

          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Ngày sinh</div>
            <div className="w-[80%] pl-5 ">
              <Controller
                control={control}
                name="date_of_birth"
                render={({ field }) => (
                  <DateSelector
                    value={field.value}
                    onChange={field.onChange}
                    errorMessage={errors.date_of_birth?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col flex-wrap sm:flex-row">
            <div className="w-[20%] truncate pt-3 text-right capitalize"></div>
            <div className=" pl-5 ">
              <button type="submit" className="rounded bg-crimson px-4 py-3 text-white hover:bg-crimson/90">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center md:w-72 ">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000"
                alt=""
                className="h-full w-full rounded-full border-4 border-solid border-[#c2e1ff] object-cover"
              />
            </div>
            <input type="file" accept=".jpg,.jpeg,.png" className="hidden" ref={fileInputRef} onChange={onFileChange} />
            <button className="border px-6 py-2" onClick={handleSelectImage} type="button">
              Chọn ảnh
            </button>
            <div className="mt-5 text-gray-400 ">Dung lượng file tối đa 1 MB</div>
            <div className="mt-2 text-gray-400">Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </div>
    </div>
  );
}
