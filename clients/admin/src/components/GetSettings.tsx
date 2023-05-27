import React, { useEffect, useState } from 'react';
import { Setting } from '../Types/SettingType';

type SettingRow = {
  field: string;
  dataField: string;
  value?: Setting;
};

const settingRows: SettingRow[] = [
  { field: 'Mail Host', dataField: 'mail_host' },
  { field: 'Mail Port', dataField: 'mail_port' },
  { field: 'Mail Username', dataField: 'mail_username' },
  { field: 'Mail Password', dataField: 'mail_password' },
  { field: 'Upload Directory', dataField: 'upload_directory' },
  { field: 'App Host', dataField: 'app_host' },
  { field: 'App Port', dataField: 'app_port' },
];

function GetSettings() {
  const [settings, setSettings] = useState<SettingRow[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const fetchPromises = settingRows.map((row) =>
        fetch(`/api/setting/${row.dataField}`, {
          headers: {
            Authorization: 'Basic ' + btoa('ykartal@ogu.edu.tr:sdfasdfadfasdfasdfasdf'),
          },
          method: 'GET',
        }).then((response) => response.json())
      );

      try {
        const results = await Promise.all(fetchPromises);
        const updatedSettings = settingRows.map((row, index) => ({
          ...row,
          value: results[index],
        }));
        setSettings(updatedSettings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSettings();
  }, []);

  const handleEdit = (index: number) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = {
      ...updatedSettings[index],
      value: {
        ...updatedSettings[index].value!,
        editable: true,
      },
    };
    setSettings(updatedSettings);
  };

  const handleSave = async (index: number) => {
    const setting = settings[index];
    if (setting && setting.value) {
      const updatedSettings = [...settings];
      updatedSettings[index] = {
        ...updatedSettings[index],
        value: {
          ...updatedSettings[index].value!,
          editable: false,
        },
      };
      setSettings(updatedSettings);

      try {
        const response = await fetch(`/api/setting/${setting.dataField}`, {
          headers: {
            Authorization: 'Basic ' + btoa('ykartal@ogu.edu.tr:sdfasdfadfasdfasdfasdf'),
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(setting.value),
        });

        if (response.ok) {
          console.log('Değer başarıyla kaydedildi.');
        } else {
          console.log('Değer kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (index: number, newValue: string) => {
    const updatedSettings = [...settings];
    updatedSettings[index] = {
      ...updatedSettings[index],
      value: {
        ...updatedSettings[index].value!,
        value: newValue,
      },
    };
    setSettings(updatedSettings);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Ayarlar</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-bold w-24">
                Alan
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-bold w-24">
                Değer
              </th>
              <th className="px-6 py-3 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting: SettingRow, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 w-48 font-bold">{setting.field}</td>
                <td className="px-6 py-4">
                  {setting.value && setting.value.editable ? (
                    <div className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
                      <textarea
                        value={setting.value.value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="w-full h-16 resize-none overflow-auto"
                        style={{ maxHeight: '8rem' }}
                      />
                    </div>
                  ) : (
                    <span>{setting.value ? setting.value.value : ''}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {setting.value && setting.value.editable ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none w-24"
                    >
                      Kaydet
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2 focus:outline-none w-24"
                    >
                      Düzenle
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default GetSettings;
