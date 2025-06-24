import React, { useState, useEffect } from 'react';
import TopBarWithLogo from '../TopBarWithLogo';
import Form from './Form';
const ProjectWizard = () => {
    return (
        <div>
            <TopBarWithLogo title='Project Creator Wizard'/>
            <Form/>
        </div>
    )
};

export default ProjectWizard;