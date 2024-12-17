import React from 'react';
import TopLevelGroup from '../../TopLevelGroup';
import useSettingGroup from '../../../hooks/useSettingGroup';
import {SettingGroupContent, TextField, withErrorBoundary} from '@tryghost/admin-x-design-system';
import {getSettingValues} from '@tryghost/admin-x-framework/api/settings';

const TitleAndDescription: React.FC<{ keywords: string[] }> = ({keywords}) => {
    const {
        localSettings,
        isEditing,
        saveState,
        focusRef,
        handleSave,
        handleCancel,
        updateSetting,
        handleEditingChange
    } = useSettingGroup();

    const [title, description] = getSettingValues(localSettings, ['title', 'description']) as string[];

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('title', e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('description', e.target.value);
    };

    const values = (
        <SettingGroupContent
            columns={2}
            values={[
                {
                    heading: 'عنوان الموقع',
                    key: 'site-title',
                    value: title
                },
                {
                    heading: 'وصف الموقع',
                    key: 'site-description',
                    value: description
                }
            ]}
        />
    );

    const inputFields = (
        <SettingGroupContent>
            <TextField
                hint="اسم موقعك"
                inputRef={focusRef}
                maxLength={150}
                placeholder="عنوان الموقع"
                title="عنوان الموقع"
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                hint="وصف قصير، يستخدم في موضوعك، البيانات الوصفية ونتائج البحث"
                maxLength={200}
                placeholder="وصف الموقع"
                title="وصف الموقع"
                value={description}
                onChange={handleDescriptionChange} />
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
        description='التفاصيل المستخدمة لتعريف منشورك على الإنترنت'
        isEditing={isEditing}
            keywords={keywords}
            navid='general'
            saveState={saveState}
            testId='title-and-description'
            title='العنوان والوصف'
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={handleSave}
        >
            {isEditing ? inputFields : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(TitleAndDescription, 'العنوان والوصف');
