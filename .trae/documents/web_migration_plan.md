# Web项目迁移到Website项目的实现计划

## 项目概述
需要将 `apps/web` 文件夹中的硕士课程、毕业设计等页面内容迁移到 `apps/website` 项目中，采用 website 项目的现代玻璃拟态设计风格，同时保留原有的内容和结构。

## 迁移任务列表

### [ ] 任务 1: 分析现有 Website 项目结构和设计风格
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 深入分析 apps/website 项目的文件结构、组件设计和样式系统
  - 了解现有的页面实现方式和国际化机制
  - 确认设计风格的关键元素和技术实现
- **Success Criteria**:
  - 完整理解 website 项目的架构和设计风格
  - 识别需要保留和复用的组件和样式
- **Test Requirements**:
  - `programmatic` TR-1.1: 确认 website 项目能够正常构建和运行
  - `human-judgement` TR-1.2: 评估设计风格的关键元素（玻璃拟态、主题切换、动画效果等）

### [ ] 任务 2: 提取 Web 项目中的内容
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 从 apps/web/src/pages 中提取硕士课程、毕业设计等页面的内容
  - 分析 web 项目的国际化文件结构和内容
  - 识别需要迁移的资源文件（PDF、ZIP等）
- **Success Criteria**:
  - 完整提取所有需要迁移的内容
  - 整理出内容结构和层次关系
- **Test Requirements**:
  - `programmatic` TR-2.1: 确认所有内容文件都已被正确识别
  - `human-judgement` TR-2.2: 验证内容的完整性和准确性

### [ ] 任务 3: 更新 Website 项目的国际化文件
- **Priority**: P1
- **Depends On**: Task 2
- **Description**:
  - 更新 apps/website/src/i18n 中的国际化文件
  - 为硕士课程、毕业设计等页面添加中英文内容
  - 确保国际化结构与现有 website 项目保持一致
- **Success Criteria**:
  - 所有页面的国际化文件都已更新
  - 内容与 web 项目保持一致
- **Test Requirements**:
  - `programmatic` TR-3.1: 确认国际化文件格式正确
  - `human-judgement` TR-3.2: 验证中英文内容的准确性和完整性

### [ ] 任务 4: 迁移资源文件
- **Priority**: P1
- **Depends On**: Task 2
- **Description**:
  - 从 apps/web 中迁移资源文件到 apps/website
  - 包括 PDF、ZIP 等文件
  - 确保资源文件的路径正确更新
- **Success Criteria**:
  - 所有资源文件都已成功迁移
  - 文件路径在新项目中正确引用
- **Test Requirements**:
  - `programmatic` TR-4.1: 确认资源文件已存在于正确位置
  - `human-judgement` TR-4.2: 验证资源文件能够正常访问

### [ ] 任务 5: 更新硕士课程页面
- **Priority**: P1
- **Depends On**: Task 3, Task 4
- **Description**:
  - 更新 apps/website/src/components/masters-courses/MastersCoursesPage.tsx
  - 确保内容结构与 web 项目一致
  - 应用 website 项目的设计风格
- **Success Criteria**:
  - 硕士课程页面内容完整
  - 设计风格与 website 项目一致
- **Test Requirements**:
  - `programmatic` TR-5.1: 页面能够正常加载和显示
  - `human-judgement` TR-5.2: 设计风格与整体网站一致，内容完整准确

### [ ] 任务 6: 更新毕业设计页面
- **Priority**: P1
- **Depends On**: Task 3, Task 4
- **Description**:
  - 更新 apps/website/src/components/graduation-thesis/GraduationThesisPage.tsx
  - 确保内容结构与 web 项目一致
  - 应用 website 项目的设计风格
- **Success Criteria**:
  - 毕业设计页面内容完整
  - 设计风格与 website 项目一致
- **Test Requirements**:
  - `programmatic` TR-6.1: 页面能够正常加载和显示
  - `human-judgement` TR-6.2: 设计风格与整体网站一致，内容完整准确

### [ ] 任务 7: 创建其他子页面
- **Priority**: P2
- **Depends On**: Task 3, Task 4
- **Description**:
  - 为 snow-globe、multimodal-interaction 等页面创建对应的组件
  - 应用 website 项目的设计风格
  - 确保页面内容完整
- **Success Criteria**:
  - 所有子页面都已创建并内容完整
  - 设计风格与 website 项目一致
- **Test Requirements**:
  - `programmatic` TR-7.1: 所有子页面能够正常加载和显示
  - `human-judgement` TR-7.2: 设计风格与整体网站一致，内容完整准确

### [ ] 任务 8: 测试和验证
- **Priority**: P1
- **Depends On**: Task 5, Task 6, Task 7
- **Description**:
  - 测试所有迁移的页面
  - 验证设计风格的一致性
  - 确保所有链接和资源都能正常访问
  - 测试响应式设计和主题切换
- **Success Criteria**:
  - 所有页面都能正常运行
  - 设计风格一致
  - 所有功能正常工作
- **Test Requirements**:
  - `programmatic` TR-8.1: 所有页面能够正常构建和访问
  - `human-judgement` TR-8.2: 设计风格一致，用户体验良好

## 技术实现注意事项

1. **设计风格保持一致**:
   - 使用 website 项目现有的玻璃拟态设计
   - 确保主题切换功能正常
   - 保持动画效果的一致性

2. **国际化处理**:
   - 遵循 website 项目现有的国际化结构
   - 确保中英文内容都已正确迁移

3. **资源文件管理**:
   - 将资源文件放在合适的位置
   - 确保文件路径正确更新

4. **响应式设计**:
   - 确保所有页面在不同设备上都能正常显示
   - 保持与 website 项目一致的响应式布局

5. **性能优化**:
   - 确保迁移后的页面加载速度快
   - 优化资源文件的加载

## 预期成果

- 所有 web 项目中的页面内容都已迁移到 website 项目
- 采用 website 项目的现代玻璃拟态设计风格
- 所有页面功能正常，响应式设计良好
- 国际化支持完整
- 资源文件能够正常访问

## 时间估计

- 任务 1: 1 天
- 任务 2: 1 天
- 任务 3: 1 天
- 任务 4: 半天
- 任务 5: 1 天
- 任务 6: 1 天
- 任务 7: 1-2 天
- 任务 8: 1 天

**总时间估计**: 7-8 天